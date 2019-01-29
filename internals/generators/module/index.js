/**
 * module Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a module',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container or module or page with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
  ],
  actions: data => {
    // add component
    let componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './module/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './module/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.tsx',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/tests/index.test.ts',
        templateFile: './module/test.js.hbs',
        abortOnFail: true,
      },
    ];
    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/messages.ts',
        templateFile: './module/messages.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/component/{{properCase name}}/Loadable.ts',
        templateFile: './module/loadable.js.hbs',
        abortOnFail: true,
      });
    }
    return actions;
  },
};
