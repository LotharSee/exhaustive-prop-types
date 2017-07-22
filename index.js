// Internal propTypes key used for our custom prop.
var INTERNAL_PROP_TYPE_FIELD = '_exhaustive-prop-types';

/**
 * Extends propTypes to warn on unexpected props
 *
 * Add an extra private property to `propTypes` which, when checked,
 * will check all the props supplied to the component then report an error
 * for the ones not described in the `propTypes`.
 * For performance reasons, this mutates the propTypes adding a new internal one instead of creating new ones.
 */
function exhaustivePropTypes(propTypes) {
    "use strict";

    propTypes[INTERNAL_PROP_TYPE_FIELD] = function(props, propName, componentName) {
        // Find all the props which were not in propTypes
        var invalidProps = Object.keys(props).reduce(function(missingPropTypes, prop) {
            if (!propTypes.hasOwnProperty(prop) && prop !== INTERNAL_PROP_TYPE_FIELD) {
                missingPropTypes.push(prop);
            }
            return missingPropTypes;
        }, []);
        // If we found some, create an error for all of them
        if (invalidProps.length === 1) {
            return new Error(
                "The prop `" + invalidProps[0] + "` isn't defined in `" + componentName + "` propTypes."
            );
        } else if (invalidProps.length > 1) {
            return new Error(
                "The props `" + invalidProps.join('`, `') + "` aren't defined in `" + componentName + "` propTypes."
            );
        }
    }

    return propTypes;
}

/**
 * Update the propTypes of a component to make it exhaustive.
 *
 * For performance reasons, this mutates the component instead of wrapping it with a higher-order one.
 */
function exhaustive(component) {
  component.propTypes = exhaustivePropTypes(component.propTypes);
  return component;
}


module.exports = {
    exhaustivePropTypes: exhaustivePropTypes,
    exhaustive: exhaustive
};
