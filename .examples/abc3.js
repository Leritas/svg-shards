// Extended Functional Commands for Geometric Construction
// Part of refactored abc2.js - Constructive Commands (EExec*)

const EPS = 0.001;

function sqrt(x) {
  return Math.sqrt(x);
}

class ConstructiveCommands {
  constructor(geometry) {
    this.geometry = geometry;
    this.systemVariables = {
      allowComplex: true,
      checkConstructibility: true
    };
  }

  createNumber(value, attributes) {
    return this.geometry.createNumber(value, attributes);
  }

  createEmpty(attributes) {
    return this.geometry.createEmpty(attributes);
  }

  EExecC0(result, value, att, sign) {
    if (value.type !== 'C') return false;
    return this.geometry.createNumber(value.value, att);
  }

  EExecP0(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') return returnEmpty(result, att);
    return this.geometry.createPoint(x.value, y.value, 1, att);
  }

  EExecP1(result, point, dx, dy, att, sign1, sign2, sign3) {
    if (point.type !== 'P' || dx.type !== 'C' || dy.type !== 'C') {
      return false;
    }

    const newX = point.x.add(dx.value);
    const newY = point.y.add(dy.value);
    return this.geometry.createPoint(newX, newY, point.weight, att);
  }

  EExecPP(result, p1, p2, att, sign1, sign2) {
    if (p1.type !== 'P' || p2.type !== 'P') {
      return this.createEmpty(att);
    }

    if (this.isProper(p1) && this.isProper(p2)) {
      const x = (p1.x.re + p2.x.re) / 2;
      const y = (p1.x.im + p2.x.im) / 2;
      const newX = (p1.y.re + p2.y.re) / 2;
      const newY = (p1.y.im + p2.y.im) / 2;

      return this.geometry.createPoint(
        new Complex(x, y),
        new Complex(newX, newY),
        1,
        att
      );
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecDN(result, x, y, att, sign1, sign2) {
    if (x.type !== 'P' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    if (this.isProper(x) && this.isProper(y)) {
      const c1 = this.EExecC2({}, x, y, att, 1, 1);
      const c2 = this.EExecAQ({}, c1, {value: new Complex(2, 0), type: 'C'}, att, 1, 1);
      const p1 = this.EExecPP({}, x, y, att, 1, 1);
      return this.EExecD0(result, p1, c2, att, 1, 1);
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecC7(result, value, att, sign1) {
    if (value.type !== 'O') {
      return this.createEmpty(att);
    }

    let SCDP;
    if (sign1 === 1) {
      SCDP = this.geometry.calculateDirectionCoefficients(
        value.x1.re, value.y1.re,
        value.x2.re, value.y2.re
      );
    } else {
      SCDP = this.geometry.calculateDirectionCoefficients(
        value.x2.re, value.y2.re,
        value.x1.re, value.y1.re
      );
    }

    const angle = this.geometry.angle(0, 1, SCDP.sin, SCDP.cos);
    let normalizedAngle = angle;
    if (normalizedAngle < 0) normalizedAngle = 2 * Math.PI + normalizedAngle;

    const angleInDegrees = normalizedAngle * 180 / Math.PI;
    return this.geometry.createNumber(new Complex(angleInDegrees, 0), att);
  }

  EExecCI(result, x, y, att, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'O') {
      return this.createEmpty(att);
    }

    let SCDP1, SCDP2;

    if (sign1 === 1) {
      SCDP1 = this.geometry.calculateDirectionCoefficients(
        x.x1.re, x.y1.re,
        x.x2.re, x.y2.re
      );
    } else {
      SCDP1 = this.geometry.calculateDirectionCoefficients(
        x.x2.re, x.y2.re,
        x.x1.re, x.y1.re
      );
    }

    let angle1 = this.geometry.angle(0, 1, SCDP1.sin, SCDP1.cos);
    if (angle1 < 0) angle1 = 2 * Math.PI + angle1;

    if (sign2 === 1) {
      SCDP2 = this.geometry.calculateDirectionCoefficients(
        y.x1.re, y.y1.re,
        y.x2.re, y.y2.re
      );
    } else {
      SCDP2 = this.geometry.calculateDirectionCoefficients(
        y.x2.re, y.y2.re,
        y.x1.re, y.y1.re
      );
    }

    let angle2 = this.geometry.angle(0, 1, SCDP2.sin, SCDP2.cos);
    if (angle2 < 0) angle2 = 2 * Math.PI + angle2;

    if (angle2 < angle1) angle2 = angle2 + 2 * Math.PI;

    const angleDifference = (angle2 - angle1) * 180 / Math.PI;
    return this.geometry.createNumber(new Complex(angleDifference, 0), att);
  }

  EExecPR(result, x, att, sign1) {
    if (x.type !== 'P') {
      return this.createEmpty(att);
    }

    const vx = x.x;
    const vy = x.y;
    return this.geometry.createPoint(
      new Complex(vx.re, -vx.im),
      new Complex(vy.re, -vy.im),
      1,
      att
    );
  }

  EExecCJ(result, x, y, z, att, sign1, sign2, sign3) {
    if (x.type !== 'P' || y.type !== 'P' || z.type !== 'O') {
      return false;
    }

    if (this.isProper(x) && this.isProper(y) && this.isProper(z) &&
        this.isReal(x) && this.isReal(y) && this.isReal(z)) {

      const a = this.calculateCJ(x, y, z, sign3);

      if (a.real) {
        return this.geometry.createNumber(
          new Complex(a.x, a.y),
          att
        );
      }
    }

    if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecO0(result, p1, p2, att, sign1, sign2) {
    if (p1.type !== 'P' || p2.type !== 'P') {
      return false;
    }

    const type = (p1.weight === 0 && p2.weight === 0) ? "nesobstv" : "sobstv";

    if (this.isProper(p1) && this.isProper(p2)) {
      const line = this.geometry.createLine(
        p1.x, p1.y, 1,
        p2.x, p2.y, 1,
        false, "sobstv", att
      );

      if (line) {
        line.addIncident(p1);
        line.addIncident(p2);
      }

      return line;
    }

    if ((p1.weight === 1 && p2.weight === 0) || (p2.weight === 1 && p1.weight === 0)) {
      const properPoint = p1.weight === 1 ? p1 : p2;
      const improperPoint = p1.weight === 0 ? p1 : p2;

      if (improperPoint.y.im === 0) {
        const dx = improperPoint.x.re;
        const dy = improperPoint.y.re;
        const length = Math.sqrt(dx * dx + dy * dy);

        let sin1, cos1, angle;
        if (length > 0) {
          sin1 = dy / length;
          cos1 = dx / length;
          angle = Math.atan2(sin1, cos1);
        }

        const x2 = properPoint.x.re + 100 * Math.cos(angle);
        const y2 = properPoint.y.re + 100 * Math.sin(angle);

        const line = this.geometry.createLine(
          properPoint.x, properPoint.y, 1,
          new Complex(x2, 0), new Complex(y2, 0), 1,
          false, "sobstv", att
        );

        if (line) {
          line.addIncident(p1);
          line.addIncident(p2);
        }

        return line;
      }

      const line = this.geometry.createLine(
        p1.x, p1.y, p1.weight,
        p2.x, p2.y, p2.weight,
        false, "sobstv", att
      );

      if (line) {
        line.addIncident(p1);
        line.addIncident(p2);
      }

      return line;
    }

    if (p1.weight === 0 && p2.weight === 0) {
      const line = this.geometry.createLine(
        new Complex(p1.x.re, 0),
        new Complex(p1.y.re, 0),
        0,
        new Complex(p2.x.re, 0),
        new Complex(p2.y.re, 0),
        0,
        true, "nesobstv", att
      );

      if (line) {
        line.addIncident(p1);
        line.addIncident(p2);
      }

      return line;
    }

    return this.createEmpty(att);
  }

  EExecO2(result, x1, y1, x2, y2, att, sign1, sign2, sign3, sign4) {
    if (x1.type !== 'C' || y1.type !== 'C' || x2.type !== 'C' || y2.type !== 'C') {
      return false;
    }

    return this.geometry.createLine(
      x1.value, y1.value, 1,
      x2.value, y2.value, 1,
      false, "sobstv", att
    );
  }

  EExecO8(result1, result2, x, y, att1, att2, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'O') {
      return false;
    }

    let x1, y1, x2, y2;
    if (sign1 === 1) {
      x1 = new Complex(x.x1.re, 0);
      y1 = new Complex(x.y1.re, 0);
      x2 = new Complex(x.x2.re, 0);
      y2 = new Complex(x.y2.re, 0);
    } else {
      x2 = new Complex(x.x1.re, 0);
      y2 = new Complex(x.y1.re, 0);
      x1 = new Complex(x.x2.re, 0);
      y1 = new Complex(x.y2.re, 0);
    }

    const SCDP1 = this.geometry.calculateDirectionCoefficients(x1.re, y1.re, x2.re, y2.re);
    let angle1 = this.geometry.angle(0, 1, SCDP1.sin, SCDP1.cos);
    if (angle1 < 0) angle1 = 2 * Math.PI + angle1;

    if (sign2 === 1) {
      x1 = new Complex(y.x1.re, 0);
      y1 = new Complex(y.y1.re, 0);
      x2 = new Complex(y.x2.re, 0);
      y2 = new Complex(y.y2.re, 0);
    } else {
      x2 = new Complex(y.x1.re, 0);
      y2 = new Complex(y.y1.re, 0);
      x1 = new Complex(y.x2.re, 0);
      y1 = new Complex(y.y2.re, 0);
    }

    const SCDP2 = this.geometry.calculateDirectionCoefficients(x1.re, y1.re, x2.re, y2.re);
    let angle2 = this.geometry.angle(0, 1, SCDP2.sin, SCDP2.cos);
    if (angle2 < 0) angle2 = 2 * Math.PI + angle2;

    if (angle2 < angle1) angle2 = angle2 + 2 * Math.PI;

    const angleDifference = angle2 - angle1;
    const angleOffset = angle1 + angleDifference / 2;

    const intersection = this.geometry.lineIntersectionComplex(
      x.x1.re, x.y1.re, x.x2.re, x.y2.re,
      y.x1.re, y.y1.re, y.x2.re, y.y2.re
    );

    const bx = intersection.x;
    const by = intersection.y;

    const ax1 = bx + 100 * Math.cos(angleOffset);
    const ay1 = by + 100 * Math.sin(angleOffset);

    const line1 = this.geometry.createLine(
      new Complex(bx, 0), new Complex(by, 0), 1,
      new Complex(ax1, 0), new Complex(ay1, 0), 1,
      false, "sobstv", att1
    );

    const angleOffset2 = angleOffset + Math.PI / 2;
    const ax2 = bx + 100 * Math.cos(angleOffset2);
    const ay2 = by + 100 * Math.sin(angleOffset2);

    const line2 = this.geometry.createLine(
      new Complex(bx, 0), new Complex(by, 0), 1,
      new Complex(ax2, 0), new Complex(ay2, 0), 1,
      false, "sobstv", att2
    );

    return { line1, line2 };
  }

  EExecD0(result, p, r, att, sign1, sign2) {
    if (p.type !== 'P' || r.type !== 'C') {
      return false;
    }

    const arc = this.geometry.createArc(
      p.x, p.y, r.value,
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      att
    );

    result.arc = arc;
    return arc;
  }

  EExecD2(result, x, y, att, sign1, sign2) {
    let xCenter = new Complex(0, 0);
    let yCenter = new Complex(0, 0);
    let radius = new Complex(0, 0);
    let coordAllow = false;
    let radiusAllow = false;

    if (x.type === 'P' && this.isProper(x)) {
      xCenter = x.x;
      yCenter = x.y;
      coordAllow = true;
    } else if (x.type === 'D') {
      xCenter = x.center;
      yCenter = new Complex(x.center.re, 0);
      coordAllow = true;
    }

    if (y.type === 'C') {
      radius = new Complex(y.value.re / 2, y.value.im / 2);
      radiusAllow = true;
    } else if (y.type === 'O' && y.attributes.level === 0) {
      radius = new Complex(
        Math.sqrt(Math.pow(y.x2.re - y.x1.re, 2) + Math.pow(y.y2.re - y.y1.re, 2)) / 2,
        0
      );
      radiusAllow = true;
    } else if (y.type === 'D') {
      radius = y.radius;
      radiusAllow = true;
    }

    if (coordAllow && radiusAllow) {
      return this.geometry.createArc(
        xCenter, yCenter,
        new Complex(radius.re * sign2, radius.im * sign2),
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        att
      );
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecD3(result, p, r, att, sign1, sign2) {
    if (p.type !== 'P' || r.type !== 'C') {
      return false;
    }

    const v = new Complex(
      r.value.re / 2 / Math.PI,
      r.value.im / 2 / Math.PI
    );

    return this.geometry.createArc(
      p.x, p.y, v,
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      att
    );
  }

  EExecD5(result, p, r, att, sign1, sign2) {
    if (p.type !== 'P' || r.type !== 'C') {
      return false;
    }

    const v = new Complex(
      Math.sqrt(r.value.re / Math.PI) * Math.sign(r.value.re),
      0
    );

    return this.geometry.createArc(
      p.x, p.y, v,
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      att
    );
  }

  EExecD00(result, x, y, z, a, sign1, sign2, sign3) {
    let xCenter = new Complex(0, 0);
    let yCenter = new Complex(0, 0);
    let radius = new Complex(0, 0);

    const att = a.clone();
    if (att.level === 0 || att.level === 2) {
      att.level = 1;
    }

    if ((x.type === 'C' || x.type === 'D') && (y.type === 'C' || y.type === 'D') &&
        (z.type === 'C' || z.type === 'O' || z.type === 'D')) {

      if (x.type === 'C') xCenter = new Complex(sign1 * x.value.re, x.value.im);
      if (y.type === 'C') yCenter = new Complex(sign2 * y.value.re, y.value.im);

      if (x.type === 'D') {
        xCenter = new Complex(sign1 * x.center.re, x.center.im);
        yCenter = new Complex(sign2 * x.center.re, x.center.re);
      }
      if (y.type === 'D') {
        yCenter = new Complex(sign2 * y.center.re, y.center.im);
      }

      if (z.type === 'C') radius = z.value;
      if ((z.type === 'O') && z.attributes.level === 0) {
        radius = new Complex(
          Math.sqrt(Math.pow(z.x2.re - z.x1.re, 2) + Math.pow(z.y2.re - z.y1.re, 2)),
          0
        );
      }
      if (z.type === 'D') radius = z.radius;

      return this.geometry.createArc(
        xCenter, yCenter, radius,
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        att
      );
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  isProper(obj) {
    if (!obj) return false;
    if (obj.type === 'P') return obj.weight === 1;
    if (obj.type === 'O') return obj.w1 === 1 && obj.w2 === 1;
    return false;
  }

  isReal(obj) {
    if (!obj) return false;
    if (obj.type === 'P') {
      return Math.abs(obj.x.im) < EPS && Math.abs(obj.y.im) < EPS;
    }
    if (obj.type === 'O') {
      return Math.abs(obj.x1.im) < EPS && Math.abs(obj.y1.im) < EPS &&
             Math.abs(obj.x2.im) < EPS && Math.abs(obj.y2.im) < EPS;
    }
    if (obj.type === 'D') {
      return Math.abs(obj.center.im) < EPS && Math.abs(obj.radius.im) < EPS;
    }
    if (obj.type === 'C') {
      return Math.abs(obj.value.im) < EPS;
    }
    return false;
  }

  calculateCJ(x, y, z, sign3) {
    let result = { x: 0, y: 0, real: true };

    if (x.type === 'P' && y.type === 'P' && z.type === 'O') {
      const U1 = this.geometry.projectPointToLine(x, z);
      const A1 = U1 ? U1.x : new Complex(0, 0);
      const B1 = U1 ? U1.y : new Complex(0, 0);

      const U2 = this.geometry.projectPointToLine(y, z);
      const A2 = U2 ? U2.x : new Complex(0, 0);
      const B2 = U2 ? U2.y : new Complex(0, 0);

      const diffAx = A2.subtract(A1);
      const diffBx = B2.subtract(B1);

      const D = new Complex(
        Math.sqrt(Math.pow(diffAx.re, 2) + Math.pow(diffBx.re, 2)),
        0
      );

      if (Math.abs(D.re) < EPS) {
        result.x = 0;
        return result;
      }

      let C = 0;
      if (Math.abs(A2.re - A1.re) > EPS) {
        C = Math.sign((A2.re - A1.re) / (z.x1.re - z.x2.re));
      } else if (Math.abs(B2.re - B1.re) > EPS) {
        C = Math.sign((B2.re - B1.re) / (z.y1.re - z.y2.re));
      } else {
        result.real = false;
        return result;
      }

      result.x = D.re * C * sign3;
      result.y = 0;
    } else {
      result.real = false;
    }

    return result;
  }

  EExecP2(result, line1, line2, att, sign1, sign2) {
    if (line1.type !== 'O' || line2.type !== 'O') {
      return false;
    }

    const intersection = this.geometry.lineIntersection(line1, line2);

    if (intersection) {
      return intersection;
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecP3(result1, result2, arc1, arc2, att1, att2, sign1, sign2) {
    if (arc1.type !== 'D' || arc2.type !== 'D') {
      return false;
    }

    const intersections = this.geometry.calculateCircleIntersections(arc1, arc2);

    if (!intersections) {
      if (att1.checked) result1 = this.createEmpty(att1);
      if (att2.checked) result2 = this.createEmpty(att2);
      return { result1, result2 };
    }

    const { X1, Y1, X2, Y2 } = intersections;
    const point1 = this.geometry.createPoint(X1, Y1, 1, att1);
    const point2 = this.geometry.createPoint(X2, Y2, 1, att2);

    if (point1) {
      arc1.addIncident(point1);
      arc2.addIncident(point1);
    }

    if (point2) {
      arc1.addIncident(point2);
      arc2.addIncident(point2);
    }

    return { result1: point1, result2: point2 };
  }

  EExecAN(result, x, y, att, sign1, sign2) {
    if (x.type !== 'P' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    const dx = y.x.subtract(x.x);
    const dy = y.y.subtract(x.y);

    const distance = Math.sqrt(dx.re * dx.re + dy.re * dy);

    return this.geometry.createNumber(new Complex(distance, 0), att);
  }

  EExecAO(result, x, y, att, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'O') {
      return this.createEmpty(att);
    }

    const angle = this.geometry.getIntersectionAngles(x, y);

    if (!angle) {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(new Complex(angle.angle, 0), att);
  }

  EExecAP(result, x, y, att, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    return this.EExecPF(result, y, x, att, sign1, sign2);
  }

  EExecAQ(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(
      x.value.multiply(y.value),
      att
    );
  }

  EExecC1(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(new Complex(Math.sqrt(value.value.re), 0), att);
  }

  EExecCH(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    const sqrtValue = value.value.sqrt();
    return this.geometry.createNumber(sqrtValue, att);
  }

  EExecC3(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(value.value.divide(new Complex(value.value.re, 0)), att);
  }

  EExecC4(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    const denominator = value.value.re * value.value.re + value.value.im * value.value.im;
    return this.geometry.createNumber(
      new Complex(
        value.value.re / denominator,
        value.value.im / denominator
      ),
      att
    );
  }

  EExecC5(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(x.value.add(y.value), att);
  }

  EExecC6(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(x.value.subtract(y.value), att);
  }

  EExecC2(result, x, y, att, sign1, sign2) {
    if (x.type !== 'P' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    if (!this.isProper(x) || !this.isProper(y)) {
      return this.createEmpty(att);
    }

    const dx = y.x.subtract(x.x);
    const dy = y.y.subtract(x.y);

    const distance = Math.sqrt(dx.re * dx.re + dy.re * dy + dx.im * dx.im + dy.im * dy.im);

    return this.geometry.createNumber(new Complex(distance * distance, 0), att);
  }

  EExecD9(result, x, y, z, att, sign1, sign2, sign3) {
    if (x.type !== 'O' || y.type !== 'O' || z.type !== 'C') {
      return false;
    }

    const angle = this.geometry.getLineAngle(x);
    const distance = z.value.re;

    const angleRad = angle * Math.PI / 180;
    const offsetX = distance * Math.cos(angleRad);
    const offsetY = distance * Math.sin(angleRad);

    const newX1 = new Complex(y.x1.re + offsetX, 0);
    const newY1 = new Complex(y.y1.re + offsetY, 0);
    const newX2 = new Complex(y.x2.re + offsetX, 0);
    const newY2 = new Complex(y.y2.re + offsetY, 0);

    const newLine = this.geometry.createLine(
      newX1, newY1, 1,
      newX2, newY2, 1,
      false, "sobstv", att
    );

    return newLine;
  }
}

function returnEmpty(result, att) {
  if (att && att.checked) {
    return new EmptyObject(att);
  }
  return null;
}