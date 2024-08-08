import * as React from "react";
import invariant from "invariant";
import { Transition } from "react-transition-group";
import { getSafePercent } from "@/utils/utils";
import { transitions } from "./transitions";

interface StepProps {
  accomplished: boolean;
  position: number;
  index: number;
  transition?: "scale" | "rotate" | "skew";
  transitionDuration?: number;
  children: ({
    accomplished,
    transitionState,
    index,
    position,
  }) => React.ReactNode;
}

export class Step extends React.Component<StepProps> {
  render() {
    const {
      accomplished,
      position,
      index,
      children,
      transition = null,
      transitionDuration = 300,
    } = this.props;

    const safePosition = getSafePercent(position);

    let style = {
      left: `${safePosition}%`,
      transitionDuration: `${transitionDuration}ms`,
    };

    return (
      <Transition in={accomplished} timeout={transitionDuration}>
        {(state) => {
          if (transition) {
            invariant(
              transitions[transition] != null,
              `${transition} is not listed in the built-in transitions.`
            );
            style = {
              ...style,
              ...transitions[transition][state],
            };
          }

          return (
            <div className="RSPBstep" style={style}>
              {children({
                accomplished,
                position: safePosition,
                transitionState: state,
                index,
              })}
            </div>
          );
        }}
      </Transition>
    );
  }
}
