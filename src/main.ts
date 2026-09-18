import { around } from 'monkey-around';
import { type App, type PluginManifest, getIconIds, Notice, Plugin } from 'obsidian';
import { LucideIcons, LucideLabIcons } from './icons';
import { type IconData, type IconPayload, type IconPayloadStore, ShapeName, ShapeType } from './types';

export default class MainstreamIconsPlugin extends Plugin {
	private isInjected: boolean;

	public constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.isInjected = false;
	}

	public override onload(): void {
		let store = hook();

		if (store) {
			for (let name in LucideIcons) {
				let data = LucideIcons[name];
				if (data) store[name] ??= toPayload(data);
			}

			for (let name in LucideLabIcons) {
				let data = LucideLabIcons[name];
				if (data) store[name] ??= toPayload(data);
			}

			this.isInjected = true;
		}

		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
		free();
	}

	public override onunload(): void {
		if (!this.isInjected) return;
		new Notice('To free leftover icon data injected by Mainstream Icons plugin from the memory, reload the app.', 5000);
	}

	public override onUserEnable(): void {
		new Notice('It is recommended to load the app first after enabling Mainstream Icons plugin.', 5000);
	}

	private onLayoutReady(): void {
		let enabledIds = this.app.plugins.enabledPlugins.keys();
		let currIdx = 0;
		let loadedFirst = false;

		for (let id of enabledIds) {
			if (currIdx > 0) break;
			loadedFirst = id === this.manifest.id;
		}

		if (!loadedFirst) {
			let enabledIds = Array.from(this.app.plugins.enabledPlugins);
			enabledIds.remove(this.manifest.id);
			enabledIds.unshift(this.manifest.id);
			this.app.plugins.enabledPlugins = new Set(enabledIds);
			this.app.plugins.requestSaveConfig();
		}

		if (!this.isInjected) {
			new Notice('Mainstream Icons plugin fails to inject icons.');
			console.warn('Mainstream Icons plugin fails to inject icons.');
		}
	}
}

function empty(obj: Record<string, unknown>): void {
	for (let prop in obj) Reflect.deleteProperty(obj, prop);
}

function toPayload(data: IconData): IconPayload {
	return data.map((shapeData) => {
		switch (shapeData[0]) {
			case ShapeName.Line: return [
				ShapeType.Line,
				shapeData[1].x1,
				shapeData[1].x2,
				shapeData[1].y1,
				shapeData[1].y2
			];

			case ShapeName.Circle: return [
				ShapeType.Circle,
				shapeData[1].cx,
				shapeData[1].cy,
				shapeData[1].r
			];

			case ShapeName.Polyline: return [
				ShapeType.Polyline,
				shapeData[1].points
			];

			case ShapeName.Polygon: return [
				ShapeType.Polygon,
				shapeData[1].points
			];

			case ShapeName.Ellipse: return [
				ShapeType.Ellipse,
				shapeData[1].cx,
				shapeData[1].cy,
				shapeData[1].rx,
				shapeData[1].ry
			];

			case ShapeName.Rect: return [
				ShapeType.Rect,
				shapeData[1].x,
				shapeData[1].y,
				shapeData[1].width,
				shapeData[1].height,
				shapeData[1].rx
			];

			case ShapeName.Path: return [
				ShapeType.Path,
				shapeData[1].d
			];
		}
	});
}

// DANGER ZONE
function hook(): IconPayloadStore | undefined {
	let payloads: IconPayloadStore | undefined;
	let triggerTrap = () => void getIconIds();
	let releaseTrap = around(Object, {
		keys: () => obj => {
			payloads = obj as IconPayloadStore;
			releaseTrap();
			return [];
		}
	});

	triggerTrap();
	if (!payloads) releaseTrap();
	return payloads;
}

function free(): void {
	empty(LucideIcons);
	empty(LucideLabIcons);
}