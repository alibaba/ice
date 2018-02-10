#!/usr/bin/env node

/**
 * Module dependencies.
 */
const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const request = require('request');
const initBlock = require('../lib/init/block');

const INIT_MAP = {
  block: initBlock,
  // TODO:
  // layout: initLayout,
  // scaffold: initScaffold,
};

const INIT_CHOICES = [
  {
    name: 'Block',
    value: {
      npm: 'ice-template-block',
      type: 'block',
    },
  },
  {
    name: 'Layout',
    value: {
      npm: 'ice-template-layout',
      type: 'layout',
    },
  },
  {
    name: 'Scaffold',
    value: {
      npm: 'ice-template-scaffold',
      type: 'scaffold',
    },
  },
];

const init = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'template',
        message: '选择初始类型',
        choices: INIT_CHOICES,
      },
    ])
    .then((answers) => {
      const type = answers.template.type;
      const npm = answers.template.npm;
      const initAction = INIT_MAP[type];

      if (typeof initAction === 'function') {
        initAction(npm);
      }
    });
};

init();
