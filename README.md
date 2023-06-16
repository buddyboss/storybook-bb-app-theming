[![Storybook](https://raw.githubusercontent.com/storybookjs/storybook-addon-console/master/docs/storybook.svg?sanitize=true)](https://react-theming.github.io/storybook-addon)

# Storybook Addon Theming Addon

Storybook theming addon. Code is intially copied from https://github.com/react-theming/storybook-addon version 1.1.10. Allows to develop themed components in isolation.

## Features :dizzy:

- Switching between themes from addon panel.
- Auto changes background
- Supports dark Storybook theme
- Keep selected theme on stories updates

## Usage

install the library

specify addon in `.storybook/main.js`

```js
// .storybook/main.js

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['storybook-bb-app-theming-addon'],
};
```

or in `.storybook/addons.js` for older versions of Storybook

```js
import 'storybook-bb-app-theming-addon/register';
```

Then you'll need to add a decorator with a ThemeProvider of your library. This project is not related to any particular styling solutions, instead, you can use **any of theme providers** you're using in your project.

```js
import ThemeProvider from 'library-of-your-choice';
import { withThemes } from 'storybook-bb-app-theming-addon';
import { theme } from '../src/theme';

const themeSelector = {
  device: ['ios', 'android'],
  mode: ['light', 'dark', 'legacy'],
  brand: ['default', 'video'],
};

// create decorator
const themingDecorator = withThemes(ThemeProvider, [theme], themeSelector);
```

ThemeProvider should accept a theme via `theme` props. The theme is an object with `name` and `pallete` propeties:

```js
export const themeAlt = {
  ...theme,
  name: 'ios-light-default',
  palette: {
    colors: {
      white: '#ffffff',
      whiteTransparent: 'rgba(255, 255, 255, 0.5)',
      blackTransparent: '#fcfcfc',
      accent1: '#3bd9d6',
      accent2: '#0a8997',
      accent3: '#292b2c',
      accent4: '#7c0435',
      accent5: '#ac924d',
      accent6: '#e0a8b4',
      accent7: '#6cb09e',
      accent8: '#8b8b6b',
      accent9: '#1f595f',
      textRed: 'orange',
    },
  },
};
```

The `name` needs to match the one of combination of `themeSelector` values. For example: "ios-light-default" or "android-dark-video".

In case of non standard ThemeProvider you can pass `providerFn` function in options:

```js
const providerFn = ({ theme, children }) => {
  return <ThemeProvider theme={muTheme}>{children}</ThemeProvider>;
};

const themingDecorator = withThemes(null, [theme], themeSelector, {
  providerFn,
});
```

## Use your output of the selected value

```js
// .storybook/preview.js

import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';

import { theme } from '../src/theme';
```

### Example getCustomFieldSnippet

```js
const selectedValue = {
  name: 'accent5',
  namespace: ['palette', 'colors'],
  type: 'color',
  value: '#ac924d',
};

const getCustomFieldSnippet = selectedValue => {
  const { namespace, name } = selectedValue;
  const path = namespace.join('.');
  const fullPath = `${path}.${name}`;
  const themeProp = `\${({ theme }) => theme.${fullPath}}`;
  return themeProp;
};

// The snippet Func function takes the SelectedValue parameter and returns a string
addDecorator(
  withThemes(ThemeProvider, [theme], themeSelector, { getCustomFieldSnippet }),
);
```

### Example getCustomValueSnippet

By default, the addon outputs colors in HEX format, if you need some kind of add-in, then pass the colorSnippet parameter.

```js
const getCustomValueSnippet = ({ value, name, type }) => {
  // Here is your code
  return value;
};

// The colorSnipept function accepts an object consisting of { value : HEX, name: string, type: color}
addDecorator(
  withThemes(ThemeProvider, [theme], themeSelector, { getCustomValueSnippet }),
);
```

BACKGROUND COLOR

This addon has ability to auto change background color when it detect a dark theme. By default it checks if the theme name contains 'dark'.

You can customize this behavior by passing `onThemeSwitch` function:

```js
export const onThemeSwitch = context => {
  const { theme } = context;
  const background = theme.name === 'ios-light-default' ? '#2c2f33' : 'white';
  const parameters = {
    backgrounds: {
      default: background,
    },
    // Pass backgrounds: null to disable background switching at all
  };
  return {
    parameters,
  };
};

const themingDecorator = withThemes(null, [theme], themeSelector, {
  onThemeSwitch,
});
```

This way you can have own checks of what the theme is selected and pass what ever color you need.

!important: The addon change background color on each theme selecting. In some scenarios you might want to disable this behavior e.g. if you already using addon-backgrounds. You can disable background switching by passing `backgrounds: null` in parameters.
