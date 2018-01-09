import FunctionScope from '../../scopes/FunctionScope';
import BlockScope from '../../scopes/FunctionScope';
import BlockStatement from '../BlockStatement';
import Identifier from '../Identifier';
import CallOptions from '../../CallOptions';
import ExecutionPathOptions from '../../ExecutionPathOptions';
import { ObjectPath } from '../../variables/VariableReassignmentTracker';
import { PatternNode } from './Pattern';
import { ForEachReturnExpressionCallback, ExpressionBase, SomeReturnExpressionCallback } from './Expression';

export default class FunctionNode extends ExpressionBase {
	id: Identifier;
	body: BlockStatement;
	scope: BlockScope;
	params: PatternNode[];

	bindNode () {
		this.body.bindImplicitReturnExpressionToScope();
	}

	forEachReturnExpressionWhenCalledAtPath (
		path: ObjectPath,
		callOptions: CallOptions,
		callback: ForEachReturnExpressionCallback,
		options: ExecutionPathOptions
	) {
		path.length === 0 &&
		this.scope.forEachReturnExpressionWhenCalled(
			callOptions,
			callback,
			options
		);
	}

	hasEffects (options: ExecutionPathOptions) {
		return this.id && this.id.hasEffects(options);
	}

	hasEffectsWhenAccessedAtPath (path: ObjectPath) {
		if (path.length <= 1) {
			return false;
		}
		if (path[0] === 'prototype') {
			return path.length > 2;
		}
		return true;
	}

	hasEffectsWhenAssignedAtPath (path: ObjectPath) {
		if (path.length <= 1) {
			return false;
		}
		if (path[0] === 'prototype') {
			return path.length > 2;
		}
		return true;
	}

	hasEffectsWhenCalledAtPath (path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions) {
		if (path.length > 0) {
			return true;
		}
		const innerOptions = this.scope.getOptionsWhenCalledWith(
			callOptions,
			options
		);
		return (
			this.params.some(param => param.hasEffects(innerOptions)) ||
			this.body.hasEffects(innerOptions)
		);
	}

	includeInBundle () {
		this.scope.variables.arguments.includeVariable();
		return super.includeInBundle();
	}

	initialiseScope (parentScope: FunctionScope) {
		this.scope = new FunctionScope({ parent: parentScope });
	}

	someReturnExpressionWhenCalledAtPath (
		path: ObjectPath,
		callOptions: CallOptions,
		predicateFunction: SomeReturnExpressionCallback,
		options: ExecutionPathOptions
	): boolean {
		return (
			path.length > 0 ||
			this.scope.someReturnExpressionWhenCalled(
				callOptions,
				predicateFunction,
				options
			)
		);
	}
}