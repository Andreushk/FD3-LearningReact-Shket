import React from "react";

export function withRainbowFrame(colors) {
  return function(Component) {
    class withRainbowFrame extends React.Component {
      render() {
        let JSX = <Component {...this.props} />;

        for (let i = 0; i < colors.length; i++) {
          const newPartOfJSX = <div style={{border: `10px solid ${colors[i]}`, padding: "5px"}}> {JSX} </div>
          JSX = newPartOfJSX;
        }

        return JSX;
      };
    };

    return withRainbowFrame;
  };
};