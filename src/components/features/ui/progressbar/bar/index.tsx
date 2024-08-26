import * as React from "react";
import invariant from "invariant";
import { getSafePercent, getStepPosition } from "@/utils/utils";

type StepProps = {
  accomplished: boolean,
  position: number,
  index: number,
};

type ProgressBarProps = {
  percent: number,
  children: React.ReactElement<StepProps>[],
  stepPositions?: Array<number>,
  unfilledBackground?: string,
  filledBackground?: string,
  width?: number,
  height?: number,
  hasStepZero?: boolean,
  text?: string,
};

export class ProgressBar extends React.Component<ProgressBarProps> {
  render() {
    const {
      percent,
      children,
      stepPositions = [],
      unfilledBackground = null,
      filledBackground = null,
      width = null,
      height = null,
      hasStepZero = true,
      text = null,
    } = this.props;

    invariant(
      !(
        stepPositions.length > 0 &&
        stepPositions.length !== React.Children.count(children)
      ),
      "When specifying a stepPositions props, the number of children must match the length of the positions array."
    );

    const safePercent = getSafePercent(percent);

    return (
      <div
        className="RSPBprogressBar"
        style={{ background: unfilledBackground, width, height }}
      >
        {/* Here we're looping over the children to clone them and add them custom props */}
        {React.Children.map(children, (step, index) => {
          if (React.isValidElement(step)) {
            const position =
              stepPositions.length > 0
                ? stepPositions[index]
                : getStepPosition(
                    React.Children.count(children),
                    index,
                    hasStepZero
                  );

            return React.cloneElement(step, {
              accomplished: position <= safePercent,
              position,
              index,
            });
          }
          return step;
        })}

        {text ? <div className="RSPBprogressBarText">{text}</div> : null}

        <div
          className="RSPBprogression"
          style={{
            background: filledBackground,
            width: `${safePercent}%`,
          }}
        />
      </div>
    );
  }
}