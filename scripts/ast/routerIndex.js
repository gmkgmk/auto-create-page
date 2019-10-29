/*
 * @Author: guo.mk
 * @Date: 2019-04-01 19:20:21
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-07-04 14:54:52
 */

const t = require('@babel/types');
const astImplement = require('./astImplement');
const { programHelper } = require('./astHelper');

// 生成model Ast树

/**
 *Creates an instance of routerAst.
 * @date 2019-04-01
 * @param {*} moduleName
 * @param {*} modulePath
 */
module.exports = class routerAst extends astImplement {
  constructor(moduleName, modulePath,body) {
    super(moduleName, modulePath,body);
  }
  ExportDefaultDeclaration(path) {
    const { declaration } = path.node;
    if (t.isObjectExpression(declaration)) {
      const { properties } = declaration;
      if (Array.isArray(properties)) {
        const elementsList = properties.find(e => t.isArrayExpression(e.value));
        if (elementsList) {
          elementsList.value.elements.push(
            t.spreadElement(t.Identifier(this.moduleName))
          );
        }
      }
    }
  }

  Program() {
    programHelper.apply(this, arguments);
  }
};
