import { makeVar, InMemoryCache, gql } from '@apollo/client';
import { pics, default_values } from '../default_value';

export const cartItemsVar = makeVar([]);
export const isLoggedIn = makeVar(!!localStorage.getItem('authToken'));
export const currentSection = makeVar('Source');

const freshSimedDict = {}
const plots = {}
const pic_page = ['sideview', 'resultview']
pic_page.map((pic) => freshSimedDict[pic] = true)
pics.map((pic) => plots[pic] = '')

export const freshSimed = makeVar(freshSimedDict);
export const plotDict = makeVar(plots);
export const rms = makeVar({ 'rms_block': null, 'rms_xy': null, 'rms_max': null });

export const configSecName = makeVar('General');
export const structSecName = makeVar('Geometry');
export const mainSectionName = makeVar('config');

const default_values_in_store = !!localStorage.getItem('default_config') ? JSON.parse(localStorage.getItem('default_config')) : default_values;
export const valueVar = makeVar(JSON.parse(JSON.stringify(default_values_in_store)));

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