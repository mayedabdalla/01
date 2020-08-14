import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Chapter = {
  __typename?: 'Chapter';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  comic?: Maybe<Comic>;
  pages?: Maybe<Array<Maybe<Page>>>;
};

export type Comic = {
  __typename?: 'Comic';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Type>;
  cover?: Maybe<File>;
  chapters?: Maybe<Array<Maybe<Chapter>>>;
};

export type File = {
  __typename?: 'File';
  id?: Maybe<Scalars['Int']>;
  filename?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComic?: Maybe<Comic>;
  addChapter?: Maybe<Chapter>;
};


export type MutationCreateComicArgs = {
  name: Scalars['String'];
  type: Type;
  text?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['Upload']>;
};


export type MutationAddChapterArgs = {
  name?: Maybe<Scalars['String']>;
  comicName?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Upload']>;
};

export type Page = {
  __typename?: 'Page';
  id?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['Int']>;
  image?: Maybe<File>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  comics?: Maybe<Array<Maybe<Comic>>>;
  comic?: Maybe<Comic>;
  chapter?: Maybe<Chapter>;
};


export type QueryComicArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryChapterArgs = {
  id?: Maybe<Scalars['Int']>;
};

export enum Type {
  Manhwa = 'MANHWA',
  Manga = 'MANGA'
}


export type ComicsQueryVariables = Exact<{ [key: string]: never; }>;


export type ComicsQuery = (
  { __typename?: 'Query' }
  & { comics?: Maybe<Array<Maybe<(
    { __typename?: 'Comic' }
    & Pick<Comic, 'id' | 'name' | 'slug' | 'type'>
    & { cover?: Maybe<(
      { __typename?: 'File' }
      & Pick<File, 'filename'>
    )> }
  )>>> }
);

export type ComicQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
}>;


export type ComicQuery = (
  { __typename?: 'Query' }
  & { comic?: Maybe<(
    { __typename?: 'Comic' }
    & Pick<Comic, 'id' | 'name' | 'text' | 'type' | 'slug'>
    & { chapters?: Maybe<Array<Maybe<(
      { __typename?: 'Chapter' }
      & Pick<Chapter, 'id' | 'name'>
    )>>>, cover?: Maybe<(
      { __typename?: 'File' }
      & Pick<File, 'filename' | 'path' | 'link'>
    )> }
  )> }
);

export type ChapterQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;


export type ChapterQuery = (
  { __typename?: 'Query' }
  & { chapter?: Maybe<(
    { __typename?: 'Chapter' }
    & Pick<Chapter, 'name'>
    & { comic?: Maybe<(
      { __typename?: 'Comic' }
      & Pick<Comic, 'name'>
    )>, pages?: Maybe<Array<Maybe<(
      { __typename?: 'Page' }
      & Pick<Page, 'id' | 'height' | 'width'>
      & { image?: Maybe<(
        { __typename?: 'File' }
        & Pick<File, 'id' | 'link' | 'filename'>
      )> }
    )>>> }
  )> }
);

export type CreateComicMutationVariables = Exact<{
  name: Scalars['String'];
  text: Scalars['String'];
  type: Type;
  cover?: Maybe<Scalars['Upload']>;
}>;


export type CreateComicMutation = (
  { __typename?: 'Mutation' }
  & { createComic?: Maybe<(
    { __typename?: 'Comic' }
    & Pick<Comic, 'id' | 'name' | 'slug' | 'type'>
  )> }
);

export type AddChapterMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Upload']>;
  comicName?: Maybe<Scalars['String']>;
}>;


export type AddChapterMutation = (
  { __typename?: 'Mutation' }
  & { addChapter?: Maybe<(
    { __typename?: 'Chapter' }
    & Pick<Chapter, 'id'>
  )> }
);


export const ComicsDocument = gql`
    query comics {
  comics {
    id
    name
    slug
    type
    cover {
      filename
    }
  }
}
    `;

/**
 * __useComicsQuery__
 *
 * To run a query within a React component, call `useComicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useComicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useComicsQuery(baseOptions?: Apollo.QueryHookOptions<ComicsQuery, ComicsQueryVariables>) {
        return Apollo.useQuery<ComicsQuery, ComicsQueryVariables>(ComicsDocument, baseOptions);
      }
export function useComicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComicsQuery, ComicsQueryVariables>) {
          return Apollo.useLazyQuery<ComicsQuery, ComicsQueryVariables>(ComicsDocument, baseOptions);
        }
export type ComicsQueryHookResult = ReturnType<typeof useComicsQuery>;
export type ComicsLazyQueryHookResult = ReturnType<typeof useComicsLazyQuery>;
export type ComicsQueryResult = Apollo.QueryResult<ComicsQuery, ComicsQueryVariables>;
export const ComicDocument = gql`
    query comic($name: String) {
  comic(name: $name) {
    id
    name
    text
    type
    slug
    chapters {
      id
      name
    }
    cover {
      filename
      path
      link
    }
  }
}
    `;

/**
 * __useComicQuery__
 *
 * To run a query within a React component, call `useComicQuery` and pass it any options that fit your needs.
 * When your component renders, `useComicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComicQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useComicQuery(baseOptions?: Apollo.QueryHookOptions<ComicQuery, ComicQueryVariables>) {
        return Apollo.useQuery<ComicQuery, ComicQueryVariables>(ComicDocument, baseOptions);
      }
export function useComicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComicQuery, ComicQueryVariables>) {
          return Apollo.useLazyQuery<ComicQuery, ComicQueryVariables>(ComicDocument, baseOptions);
        }
export type ComicQueryHookResult = ReturnType<typeof useComicQuery>;
export type ComicLazyQueryHookResult = ReturnType<typeof useComicLazyQuery>;
export type ComicQueryResult = Apollo.QueryResult<ComicQuery, ComicQueryVariables>;
export const ChapterDocument = gql`
    query chapter($id: Int) {
  chapter(id: $id) {
    name
    comic {
      name
    }
    pages {
      id
      height
      width
      image {
        id
        link
        filename
      }
    }
  }
}
    `;

/**
 * __useChapterQuery__
 *
 * To run a query within a React component, call `useChapterQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChapterQuery(baseOptions?: Apollo.QueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
        return Apollo.useQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, baseOptions);
      }
export function useChapterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
          return Apollo.useLazyQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, baseOptions);
        }
export type ChapterQueryHookResult = ReturnType<typeof useChapterQuery>;
export type ChapterLazyQueryHookResult = ReturnType<typeof useChapterLazyQuery>;
export type ChapterQueryResult = Apollo.QueryResult<ChapterQuery, ChapterQueryVariables>;
export const CreateComicDocument = gql`
    mutation CreateComic($name: String!, $text: String!, $type: Type!, $cover: Upload) {
  createComic(name: $name, text: $text, type: $type, cover: $cover) {
    id
    name
    slug
    type
  }
}
    `;
export type CreateComicMutationFn = Apollo.MutationFunction<CreateComicMutation, CreateComicMutationVariables>;

/**
 * __useCreateComicMutation__
 *
 * To run a mutation, you first call `useCreateComicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComicMutation, { data, loading, error }] = useCreateComicMutation({
 *   variables: {
 *      name: // value for 'name'
 *      text: // value for 'text'
 *      type: // value for 'type'
 *      cover: // value for 'cover'
 *   },
 * });
 */
export function useCreateComicMutation(baseOptions?: Apollo.MutationHookOptions<CreateComicMutation, CreateComicMutationVariables>) {
        return Apollo.useMutation<CreateComicMutation, CreateComicMutationVariables>(CreateComicDocument, baseOptions);
      }
export type CreateComicMutationHookResult = ReturnType<typeof useCreateComicMutation>;
export type CreateComicMutationResult = Apollo.MutationResult<CreateComicMutation>;
export type CreateComicMutationOptions = Apollo.BaseMutationOptions<CreateComicMutation, CreateComicMutationVariables>;
export const AddChapterDocument = gql`
    mutation addChapter($name: String, $pages: Upload, $comicName: String) {
  addChapter(name: $name, pages: $pages, comicName: $comicName) {
    id
  }
}
    `;
export type AddChapterMutationFn = Apollo.MutationFunction<AddChapterMutation, AddChapterMutationVariables>;

/**
 * __useAddChapterMutation__
 *
 * To run a mutation, you first call `useAddChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChapterMutation, { data, loading, error }] = useAddChapterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      pages: // value for 'pages'
 *      comicName: // value for 'comicName'
 *   },
 * });
 */
export function useAddChapterMutation(baseOptions?: Apollo.MutationHookOptions<AddChapterMutation, AddChapterMutationVariables>) {
        return Apollo.useMutation<AddChapterMutation, AddChapterMutationVariables>(AddChapterDocument, baseOptions);
      }
export type AddChapterMutationHookResult = ReturnType<typeof useAddChapterMutation>;
export type AddChapterMutationResult = Apollo.MutationResult<AddChapterMutation>;
export type AddChapterMutationOptions = Apollo.BaseMutationOptions<AddChapterMutation, AddChapterMutationVariables>;