import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { Context } from "../context";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum Type {
  Manhwa = "MANHWA",
  Manga = "MANGA",
}

export type File = {
  id?: Maybe<Scalars["Int"]>;
  filename?: Maybe<Scalars["String"]>;
  mimetype?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
};

export type Comic = {
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
  type?: Maybe<Type>;
  cover?: Maybe<File>;
  chapters?: Maybe<Array<Maybe<Chapter>>>;
};

export type Page = {
  id?: Maybe<Scalars["Int"]>;
  number?: Maybe<Scalars["Int"]>;
  image?: Maybe<File>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
};

export type Chapter = {
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  comic?: Maybe<Comic>;
  pages?: Maybe<Array<Maybe<Page>>>;
};

export type Query = {
  comics?: Maybe<Array<Maybe<Comic>>>;
  comic?: Maybe<Comic>;
  chapter?: Maybe<Chapter>;
};

export type QueryComicArgs = {
  name?: Maybe<Scalars["String"]>;
};

export type QueryChapterArgs = {
  id?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  createComic?: Maybe<Comic>;
  addChapter?: Maybe<Chapter>;
};

export type MutationCreateComicArgs = {
  name: Scalars["String"];
  type: Type;
  text?: Maybe<Scalars["String"]>;
  cover?: Maybe<Scalars["Upload"]>;
};

export type MutationAddChapterArgs = {
  name?: Maybe<Scalars["String"]>;
  comicName?: Maybe<Scalars["String"]>;
  pages?: Maybe<Scalars["Upload"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  Type: Type;
  File: ResolverTypeWrapper<File>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Comic: ResolverTypeWrapper<Comic>;
  Page: ResolverTypeWrapper<Page>;
  Chapter: ResolverTypeWrapper<Chapter>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Upload: Scalars["Upload"];
  File: File;
  Int: Scalars["Int"];
  String: Scalars["String"];
  Comic: Comic;
  Page: Page;
  Chapter: Chapter;
  Query: {};
  Mutation: {};
  Boolean: Scalars["Boolean"];
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type FileResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["File"] = ResolversParentTypes["File"]
> = {
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  filename?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  mimetype?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ComicResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Comic"] = ResolversParentTypes["Comic"]
> = {
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["Type"]>, ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  chapters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Chapter"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PageResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Page"] = ResolversParentTypes["Page"]
> = {
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ChapterResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Chapter"] = ResolversParentTypes["Chapter"]
> = {
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  comic?: Resolver<Maybe<ResolversTypes["Comic"]>, ParentType, ContextType>;
  pages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Page"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  comics?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comic"]>>>,
    ParentType,
    ContextType
  >;
  comic?: Resolver<
    Maybe<ResolversTypes["Comic"]>,
    ParentType,
    ContextType,
    RequireFields<QueryComicArgs, never>
  >;
  chapter?: Resolver<
    Maybe<ResolversTypes["Chapter"]>,
    ParentType,
    ContextType,
    RequireFields<QueryChapterArgs, never>
  >;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createComic?: Resolver<
    Maybe<ResolversTypes["Comic"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateComicArgs, "name" | "type">
  >;
  addChapter?: Resolver<
    Maybe<ResolversTypes["Chapter"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddChapterArgs, never>
  >;
};

export type Resolvers<ContextType = Context> = {
  Upload?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  Comic?: ComicResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  Chapter?: ChapterResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
