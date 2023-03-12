class BorderRadiusReversePainter {
  static get inputProperties() {
    return [
      "--border-top-left-radius",
      "--border-top-right-radius",
      "--border-bottom-right-radius",
      "--border-bottom-left-radius",

      "--border-top-left-radius-reverse",
      "--border-top-right-radius-reverse",
      "--border-bottom-right-radius-reverse",
      "--border-bottom-left-radius-reverse",

      "--border-color",

      "--linear-color-start",
      "--linear-color-end",

      "--border-right-sawtooth-radius",
      "--border-right-sawtooth-color",
    ];
  }

  clearCircle(context, x, y, radius, fillColor = '') {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    if (!fillColor) {
      context.clip();
      context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    } else {
      context.fillStyle = fillColor;
      context.fill();
    }
    context.restore();
  }

  clearCorner(context, x, y, radius, position) {
    context.save();
    context.beginPath();
    context.moveTo(x, y);
    switch (position) {
      case "top-left":
        context.lineTo(x + radius, y);
        context.arcTo(x, y, x, y + radius, radius);
        break;
      case "top-right":
        context.lineTo(x - radius, y);
        context.arcTo(x, y, x, y + radius, radius);
        break;

      case "bottom-right":
        context.lineTo(x - radius, y);
        context.arcTo(x, y, x, y - radius, radius);
        break;
      case "bottom-left":
        context.lineTo(x + radius, y);
        context.arcTo(x, y, x, y - radius, radius);
        break;
      default:
        break;
    }
    context.closePath();
    context.clip();
    context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    context.restore();
  }

  paint(ctx, geom, props) {
    const color = props.get("--border-color").toString();
    const startColor = props.get("--linear-color-start").toString();
    const endColor = props.get("--linear-color-end").toString();
    if (color) {
      ctx.fillStyle = color;
    } else if (startColor && endColor) {
      const linear = ctx.createLinearGradient(0, 0, geom.width, 0);
      linear.addColorStop(0.0, startColor);
      linear.addColorStop(1.0, endColor);
      ctx.fillStyle = linear;
    }
    ctx.fillRect(0, 0, geom.width, geom.height);

    const topLeftRadiusValue = Number(
      props.get("--border-top-left-radius").toString()
    );
    const topRightRadiusValue = Number(
      props.get("--border-top-right-radius").toString()
    );
    const bottomRightRadiusValue = Number(
      props.get("--border-bottom-right-radius").toString()
    );
    const bottomLeftRadiusValue = Number(
      props.get("--border-bottom-left-radius").toString()
    );

    const topLeftRadiusReverseValue = Number(
      props.get("--border-top-left-radius-reverse").toString()
    );
    const topRightRadiusReverseValue = Number(
      props.get("--border-top-right-radius-reverse").toString()
    );
    const bottomRightRadiusReverseValue = Number(
      props.get("--border-bottom-right-radius-reverse").toString()
    );
    const bottomLeftRadiusReverseValue = Number(
      props.get("--border-bottom-left-radius-reverse").toString()
    );

    if (topLeftRadiusValue) {
      this.clearCorner(ctx, 0, 0, topLeftRadiusValue, "top-left");
    } else if (topLeftRadiusReverseValue) {
      this.clearCircle(ctx, 0, 0, topLeftRadiusReverseValue);
    }

    if (topRightRadiusValue) {
      this.clearCorner(ctx, geom.width, 0, topRightRadiusValue, "top-right");
    } else if (topRightRadiusReverseValue) {
      this.clearCircle(ctx, geom.width, 0, topRightRadiusReverseValue);
    }

    if (bottomRightRadiusValue) {
      this.clearCorner(
        ctx,
        geom.width,
        geom.height,
        bottomRightRadiusValue,
        "bottom-right"
      );
    } else if (bottomRightRadiusReverseValue) {
      this.clearCircle(
        ctx,
        geom.width,
        geom.height,
        bottomRightRadiusReverseValue
      );
    }

    if (bottomLeftRadiusValue) {
      this.clearCorner(
        ctx,
        0,
        geom.height,
        bottomLeftRadiusValue,
        "bottom-left"
      );
    } else if (bottomLeftRadiusReverseValue) {
      this.clearCircle(ctx, 0, geom.height, bottomLeftRadiusReverseValue);
    }

    const borderRightSawtoothRadiusValue = Number(
      props.get("--border-right-sawtooth-radius").toString()
    );
    if (borderRightSawtoothRadiusValue) {
      let borderRightSawtoothHeight = geom.height;
      let yAxixShifting = 0;
      if (topRightRadiusValue) {
        yAxixShifting = topRightRadiusValue;
        borderRightSawtoothHeight -= topRightRadiusValue;
      } else if (topRightRadiusReverseValue) {
        yAxixShifting = topRightRadiusReverseValue;
        borderRightSawtoothHeight -= topRightRadiusReverseValue;
      }

      if (bottomRightRadiusValue) {
        borderRightSawtoothHeight -= bottomRightRadiusValue;
      } else if (bottomRightRadiusReverseValue) {
        borderRightSawtoothHeight -= bottomRightRadiusReverseValue;
      }

      const count = Math.floor(
        (borderRightSawtoothHeight + 3) / (borderRightSawtoothRadiusValue * 3)
      );
      const padding =
        (borderRightSawtoothHeight -
          count * (borderRightSawtoothRadiusValue * 2) -
          (count - 1) * borderRightSawtoothRadiusValue) /
        2;

      const borderRightSawtoothColor = props
        .get("--border-right-sawtooth-color")
        .toString();

      let startSawtoothY =
        yAxixShifting + padding + borderRightSawtoothRadiusValue;
      for (let index = 0; index < count; index++) {
        this.clearCircle(
          ctx,
          geom.width,
          startSawtoothY,
          borderRightSawtoothRadiusValue,
          borderRightSawtoothColor
        );
        startSawtoothY += borderRightSawtoothRadiusValue * 3;
      }
    }
  }
}

registerPaint("border-radius-reverse", BorderRadiusReversePainter);
