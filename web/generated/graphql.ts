import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AssignToolInput = {
  employeeId: Scalars['ID'];
  toolId: Scalars['ID'];
};

export type AssignToolPayload = {
  __typename?: 'AssignToolPayload';
  tool: Tool;
};

export type Employee = {
  __typename?: 'Employee';
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  assignTool: AssignToolPayload;
};


export type MutationRootAssignToolArgs = {
  input: AssignToolInput;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  employees: Array<Employee>;
  tools: Array<Tool>;
};

export type Tool = {
  __typename?: 'Tool';
  assignedTo: Employee;
  brand: Scalars['String'];
  id: Scalars['ID'];
  tagged: Scalars['String'];
  tool: Scalars['String'];
};

export type EmployeeListQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeeListQuery = { __typename?: 'QueryRoot', employees: Array<{ __typename?: 'Employee', id: string, firstName: string, lastName: string }> };

export type AssignToolMutationVariables = Exact<{
  input: AssignToolInput;
}>;


export type AssignToolMutation = { __typename?: 'MutationRoot', assignTool: { __typename?: 'AssignToolPayload', tool: { __typename?: 'Tool', id: string, assignedTo: { __typename?: 'Employee', id: string } } } };

export type EmployeePartsFragment = { __typename?: 'Employee', id: string, firstName: string, lastName: string };

export type ToolPartsFragment = { __typename?: 'Tool', id: string, tagged: string, brand: string, tool: string, assignedTo: { __typename?: 'Employee', id: string, firstName: string, lastName: string } };

export type ToolListQueryVariables = Exact<{ [key: string]: never; }>;


export type ToolListQuery = { __typename?: 'QueryRoot', tools: Array<{ __typename?: 'Tool', id: string, tagged: string, brand: string, tool: string, assignedTo: { __typename?: 'Employee', id: string, firstName: string, lastName: string } }> };

export const EmployeePartsFragmentDoc = gql`
    fragment EmployeeParts on Employee {
  id
  firstName
  lastName
}
    `;
export const ToolPartsFragmentDoc = gql`
    fragment ToolParts on Tool {
  id
  tagged
  brand
  tool
  assignedTo {
    ...EmployeeParts
  }
}
    ${EmployeePartsFragmentDoc}`;
export const EmployeeListDocument = gql`
    query EmployeeList {
  employees {
    ...EmployeeParts
  }
}
    ${EmployeePartsFragmentDoc}`;

export function useEmployeeListQuery(options?: Omit<Urql.UseQueryArgs<EmployeeListQueryVariables>, 'query'>) {
  return Urql.useQuery<EmployeeListQuery>({ query: EmployeeListDocument, ...options });
};
export const AssignToolDocument = gql`
    mutation AssignTool($input: AssignToolInput!) {
  assignTool(input: $input) {
    tool {
      id
      assignedTo {
        id
      }
    }
  }
}
    `;

export function useAssignToolMutation() {
  return Urql.useMutation<AssignToolMutation, AssignToolMutationVariables>(AssignToolDocument);
};
export const ToolListDocument = gql`
    query ToolList {
  tools {
    ...ToolParts
  }
}
    ${ToolPartsFragmentDoc}`;

export function useToolListQuery(options?: Omit<Urql.UseQueryArgs<ToolListQueryVariables>, 'query'>) {
  return Urql.useQuery<ToolListQuery>({ query: ToolListDocument, ...options });
};