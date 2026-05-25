export class Transformation {
    private _a: number;
    private _b: number;
    private _c: number;
    private _d: number;
    private _e: number;
    private _f: number;

    constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
    }

    static identity(): Transformation {
        return new Transformation();
    }

    get a(): number {
        return this._a;
    }

    get b(): number {
        return this._b;
    }

    get c(): number {
        return this._c;
    }

    get d(): number {
        return this._d;
    }

    get e(): number {
        return this._e;
    }

    get f(): number {
        return this._f;
    }

    translate(tx: number, ty: number): Transformation {
        return this.multiply(new Transformation(1, 0, 0, 1, tx, ty));
    }

    rotate(angleDeg: number, cx = 0, cy = 0): Transformation {
        const rad = (angleDeg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        const rotation = new Transformation(cos, sin, -sin, cos, 0, 0);
        const toOrigin = new Transformation(1, 0, 0, 1, -cx, -cy);
        const fromOrigin = new Transformation(1, 0, 0, 1, cx, cy);

        return this.multiply(fromOrigin.multiply(rotation.multiply(toOrigin)));
    }

    scale(sx: number, sy?: number): Transformation {
        const syValue = sy ?? sx;
        return this.multiply(new Transformation(sx, 0, 0, syValue, 0, 0));
    }

    scaleAt(sx: number, sy: number, cx: number, cy: number): Transformation {
        const toOrigin = new Transformation(1, 0, 0, 1, -cx, -cy);
        const fromOrigin = new Transformation(1, 0, 0, 1, cx, cy);
        const scaleMatrix = new Transformation(sx, 0, 0, sy, 0, 0);

        return this.multiply(fromOrigin.multiply(scaleMatrix.multiply(toOrigin)));
    }

    multiply(other: Transformation): Transformation {
        return new Transformation(
            this._a * other._a + this._c * other._b,
            this._b * other._a + this._d * other._b,
            this._a * other._c + this._c * other._d,
            this._b * other._c + this._d * other._d,
            this._a * other._e + this._c * other._f + this._e,
            this._b * other._e + this._d * other._f + this._f,
        );
    }

    toMatrixString(): string {
        return `matrix(${this._a} ${this._b} ${this._c} ${this._d} ${this._e} ${this._f})`;
    }

    clone(): Transformation {
        return new Transformation(this._a, this._b, this._c, this._d, this._e, this._f);
    }
}
