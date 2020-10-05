import { makeVar, InMemoryCache, gql } from '@apollo/client';
import { default_values } from '../default_value';

export const cartItemsVar = makeVar([]);
export const isLoggedIn = makeVar(!!localStorage.getItem('authToken'));
export const currentSection = makeVar('Source');
const default_values_in_store = !!localStorage.getItem('default_config') ? JSON.parse(localStorage.getItem('default_config')) : default_values;
export const valueVar = makeVar(default_values_in_store);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedIn();
                    }
                },
                cartItems: {
                    read() {
                        return cartItemsVar();
                    }
                },
                currentSection: {
                    read() {
                        return currentSection();
                    }
                },
                value: {
                    read() {
                        localStorage.setItem('default_config', JSON.stringify(valueVar()))
                        return valueVar();
                    }
                }
            }
        }
    }
});

export const IS_LOGGED_IN_QUERY = gql`
    query {
        isLoggedIn @client
    }
`;
export const CURRENT_SECTION_QUERY = gql`
    query {
      currentSection @client
    }
`;
export const VALUE_QUERY = gql`
    query {
      value @client
    }
`;