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
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
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
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
    {
      type: 'confirm',
      name: 'wantTypes',
      default: true,
      message: 'Do you want to have types.d.ts file',
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

    // Actions
    actions.push({
      type: 'add',
      path: '../../app/module/{{properCase name}}/actions.ts',
      templateFile: './module/actions.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: '../../app/module/{{properCase name}}/tests/actions.test.ts',
      templateFile: './module/actions.test.js.hbs',
      abortOnFail: true,
    });

    // Constants
    actions.push({
      type: 'add',
      path: '../../app/module/{{properCase name}}/constants.ts',
      templateFile: './module/constants.js.hbs',
      abortOnFail: true,
    });

    // Selectors
    actions.push({
      type: 'add',
      path: '../../app/module/{{properCase name}}/selectors.ts',
      templateFile: './module/selectors.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: '../../app/module/{{properCase name}}/tests/selectors.test.ts',
      templateFile: './module/selectors.test.js.hbs',
      abortOnFail: true,
    });

    // Reducer
    actions.push({
      type: 'add',
      path: '../../app/module/{{properCase name}}/reducer.ts',
      templateFile: './module/reducer.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: '../../app/module/{{properCase name}}/tests/reducer.test.ts',
      templateFile: './module/reducer.test.js.hbs',
      abortOnFail: true,
    });

    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/module/{{properCase name}}/saga.ts',
        templateFile: './module/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/module/{{properCase name}}/tests/saga.test.ts',
        templateFile: './module/saga.test.js.hbs',
        abortOnFail: true,
      });
    }

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
