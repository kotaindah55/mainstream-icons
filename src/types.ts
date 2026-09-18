export const enum ShapeType {
	Line,
	Circle,
	Polyline,
	Polygon,
	Ellipse,
	Rect,
	Path
}

export const enum ShapeName {
	Line = 'line',
	Circle = 'circle',
	Polyline = 'polyline',
	Polygon = 'polygon',
	Ellipse = 'ellipse',
	Rect = 'rect',
	Path = 'path'
}

export type IconPayload = ShapePayload[];

export type IconPayloadStore = Record<string, IconPayload>;

export type IconData = (
	| [ShapeName.Line, LineStruct]
	| [ShapeName.Circle, CircleStruct]
	| [ShapeName.Polyline, PolylineStruct]
	| [ShapeName.Polygon, PolygonStruct]
	| [ShapeName.Ellipse, EllipseStruct]
	| [ShapeName.Rect, RectStruct]
	| [ShapeName.Path, PathStruct]
)[];

type Nullish = undefined | null;
type Numberish = number | string;

type LinePayload = [
	shape: ShapeType.Line,
	x1: Numberish,
	x2: Numberish,
	x3: Numberish,
	x4: Numberish
]

type CirclePayload = [
	shape: ShapeType.Circle,
	cx: Numberish,
	cy: Numberish,
	r: Numberish
]

type PolylinePayload = [
	shape: ShapeType.Polyline,
	points: string
]

type PolygonPayload = [
	shape: ShapeType.Polygon,
	points: string
]

type EllipsePayload = [
	shape: ShapeType.Ellipse,
	cx: Numberish,
	cy: Numberish,
	rx: Numberish,
	ry: Numberish
]

type RectPayload = [
	shape: ShapeType.Rect,
	x: Numberish,
	y: Numberish,
	width: Numberish,
	height: Numberish,
	rx?: Numberish | Nullish
]

type PathPayload = [
	shape: ShapeType.Path,
	d: string
]

type ShapePayload =
	| LinePayload
	| CirclePayload
	| PolylinePayload
	| PolygonPayload
	| EllipsePayload
	| RectPayload
	| PathPayload;

interface LineStruct {
	x1: Numberish;
	y1: Numberish;
	x2: Numberish;
	y2: Numberish;
}

interface CircleStruct {
	cx: Numberish;
	cy: Numberish;
	r: Numberish;
}

interface PolylineStruct {
	points: string;
}

interface PolygonStruct {
	points: string;
}

interface EllipseStruct {
	cx: Numberish;
	cy: Numberish;
	rx: Numberish;
	ry: Numberish;
}

interface RectStruct {
	x: Numberish;
    y: Numberish;
    width: Numberish;
    height: Numberish;
    rx?: Numberish | Nullish;
}

interface PathStruct {
	d: string;
}

declare module 'obsidian' {
	interface App {
		plugins: PluginManager;
	}

	class PluginManager extends Events {
		enabledPlugins: Set<string>;
		requestSaveConfig(): Debouncer<[], Promise<void>>;
	}
}