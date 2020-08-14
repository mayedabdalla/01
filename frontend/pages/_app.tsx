import withApollo from 'next-with-apollo';
import {ApolloProvider} from '@apollo/client';
import {ApolloClient} from "apollo-client";
import {ApolloLink, concat, from} from "apollo-link";
import {onError} from "apollo-link-error";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {getDataFromTree} from '@apollo/react-ssr';

const {createUploadLink} = require('apollo-upload-client');

const App = ({Component, pageProps, apollo}) => (
    <ApolloProvider client={apollo}>
        <Component {...pageProps} />
    </ApolloProvider>
);
let link;
const isBrowser = typeof window !== 'undefined';
if (process.env.NODE_ENV === "development") {
    link = "http://localhost:4000/graphql"
} else {
 link = isBrowser ? '/graphql' : process.env.BACKEND_URL
}
export default withApollo(({initialState, ctx}) => {
    const isBrowser = typeof window !== 'undefined';
    return new ApolloClient({
        ssrMode: !isBrowser,
        link: from([
            onError(({graphQLErrors, networkError}) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({message, locations, path}) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                        ),
                    );
                if (networkError) console.log(`[Network error]: ${networkError}`);
            }),
            createUploadLink({uri: link }),
        ]),
        cache: new InMemoryCache().restore(initialState || {}),
    });
}, {getDataFromTree})(App);