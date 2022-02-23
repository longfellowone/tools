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
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as Strings
   * within GraphQL. UUIDs are used to assign unique identifiers to entities without requiring a central
   * allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: any;
};

export type Employee = {
  __typename?: 'Employee';
  employee: Scalars['String'];
  id: Scalars['UUID'];
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


export type EmployeeListQuery = { __typename?: 'QueryRoot', employees: Array<{ __typename?: 'Employee', id: any, employee: string }> };

export type EmployeePartsFragment = { __typename?: 'Employee', id: any, employee: string };

export type ToolPartsFragment = { __typename?: 'Tool', id: string, tagged: string, brand: string, tool: string, assignedTo: { __typename?: 'Employee', id: any, employee: string } };

export type ToolListQueryVariables = Exact<{ [key: string]: never; }>;


export type ToolListQuery = { __typename?: 'QueryRoot', tools: Array<{ __typename?: 'Tool', id: string, tagged: string, brand: string, tool: string, assignedTo: { __typename?: 'Employee', id: any, employee: string } }> };

export const EmployeePartsFragmentDoc = gql`
    fragment EmployeeParts on Employee {
  id
  employee
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