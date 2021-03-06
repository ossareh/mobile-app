import { client } from './apollo';
import { CASES_DETAIL_SLIM_QUERY } from './fragments/cases';
import { GraphQLError } from 'graphql';
import {
    casesDetailSlim,
    casesDetailSlim_cases,
} from '../../generated/casesDetailSlim';

export enum CasesTypes {
    GET_USER_CASES_START = 'GET_USER_CASES_START',
    GET_USER_CASES_SUCCESS = 'GET_USER_CASES_SUCCESS',
    GET_USER_CASES_FAILURE = 'GET_USER_CASES_FAILURE',
    CLEAR_USER_CASES = 'CLEAR_USER_CASES',
}

export interface CasesStartAction {
    type: CasesTypes.GET_USER_CASES_START;
}

export interface CasesSuccessAction {
    type: CasesTypes.GET_USER_CASES_SUCCESS;
    cases: casesDetailSlim_cases[];
}

export interface CasesFailureAction {
    type: CasesTypes.GET_USER_CASES_FAILURE;
    error: string;
}

export interface CasesClearAction {
    type: CasesTypes.CLEAR_USER_CASES;
}

export type CasesActionTypes =
    | CasesStartAction
    | CasesSuccessAction
    | CasesFailureAction
    | CasesClearAction;

export interface CasesDispatch {
    (arg0: CasesActionTypes): void;
}

// this action grabs all cases for a specified user
export const getCases = () => (dispatch: CasesDispatch) => {
    dispatch({ type: CasesTypes.GET_USER_CASES_START });
    console.log('Loading cases...');

    client
        .query<casesDetailSlim>({ query: CASES_DETAIL_SLIM_QUERY })
        .then(
            (result) => {
                console.log(`Loading cases: success`);
                dispatch({
                    type: CasesTypes.GET_USER_CASES_SUCCESS,
                    cases: result.data.cases,
                });
            },
            (error: GraphQLError | Error) => {
                console.log(
                    `Loading cases: error: ${JSON.stringify(error, null, 2)}`
                );

                dispatch({
                    type: CasesTypes.GET_USER_CASES_FAILURE,
                    error: error.message,
                });
            }
        );
};

export const clearUserCases = () => (dispatch: CasesDispatch): void => {
    dispatch({ type: CasesTypes.CLEAR_USER_CASES });
    // TODO actually clear data
};
