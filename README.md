# exhaustive-prop-types

Extend PropTypes to check undocumented props at runtime.

[PropTypes](https://www.npmjs.com/package/prop-types) checks at runtime the values of the described props.
Some static checking tools (such as [eslint-strict-react](https://www.npmjs.com/package/eslint-plugin-react) with the
[prop-types rule](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)) can
verify that component aren't using props not define in `propTypes`. However nothing checks if the component is given
props not defined defined in `propTypes`.

`exhaustive-prop-types` checks at runtime that all received props are defined in your `propTypes`. It catches
potentially extraneous or undocumented props. It helps refactoring and catching over-connected props from Redux.


## Installation

```shell
npm install --save exhaustive-prop-types
```


## Usage

Let's start with a simple component.

```jsx
import React from 'react';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        My name is {this.props.name}.
      </div>
    )
  }
}
```

They are two equivalent ways of using `exhaustive-prop-types`. You can either extend your composant.


```js
import PropTypes from 'prop-types';
import { exhaustive } from 'exhaustive-prop-types';

MyComponent.propTypes = {
  name: PropTypes.string.isRequired
};

const ExtendedComponent = exhaustive(MyComponent);
```

Or you can wrap your `Component.propTypes` with `exhaustivePropTypes`.

```js
import PropTypes from 'prop-types';
import { exhaustivePropTypes } from 'exhaustive-prop-types';


MyComponent.propTypes = exhaustivePropTypes({
  numberProp: PropTypes.number
});
```

From there, if you provide a extra prop to your component.

```jsx
<MyComponent name="Captain" age=42 />
```

You will get a warning:

```
Warning: Failed prop type: The prop `age` ins't defined in `MyComponent` propTypes.
```


## Configuration

There is no configuration. It works with standard PropTypes checking, so it should warn only in development.
