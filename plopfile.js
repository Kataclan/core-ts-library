module.exports = function (plop) {
  plop.setHelper('includes', function (items, list = [], options) {
    const valuesToCheck = items.split('|');

    if (list.some((eachItem) => valuesToCheck.includes(eachItem))) {
      return options.fn(this);
    }
  });

  plop.setGenerator('Generator', {
    description: 'Generates a new module skeleton',
    prompts: [
      {
        name: 'type',
        type: 'list',
        message: 'What do you want to create?',
        choices: [{ name: 'Module', value: 'module' }],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Module name?',
      },
      {
        type: 'confirm',
        name: 'wantRepository',
        message: 'Does it need a repository?',
      },
      {
        type: 'checkbox',
        name: 'includeRepositoryMethods',
        message: 'Which methods will you need?',
        choices: [
          { name: 'find', value: 'find' },
          { name: 'findBy', value: 'findBy' },
          { name: 'create', value: 'create' },
          { name: 'update', value: 'update' },
        ],
        when: (previousInputs) => {
          return previousInputs.wantRepository;
        },
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.type === 'module') {
        actions.push({
          type: 'add',
          path: 'src/{{name}}/entity/{{name}}.ts',
          templateFile: 'plop-templates/entity.hbs',
        });

        if (data.wantRepository) {
          actions.push(
            ...[
              {
                type: 'add',
                path: 'src/{{name}}/adapter/prepare{{name}}.ts',
                templateFile: 'plop-templates/prepare.hbs',
              },
              {
                type: 'add',
                path: 'src/{{name}}/adapter/adapt{{name}}.ts',
                templateFile: 'plop-templates/adapt.hbs',
              },
              {
                type: 'add',
                path: 'src/{{name}}/repository/{{name}}Repository.js',
                templateFile: 'plop-templates/repository.hbs',
              },
            ]
          );
        }
      }

      return actions;
    },
  });
};
