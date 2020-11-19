import 'reflect-metadata'
import {
  PubSubEngine,
  Root,
  PubSub,
  Subscription,
  Mutation,
  Query,
  Args,
  ArgsType,
  Resolver,
  Field,
  ObjectType,
  buildSchemaSync,
} from 'type-graphql'
import { v4 as randStr } from 'uuid'

import { hash, verify } from '../service'

const members: { name: string; key: string }[] = []

const topic = randStr()

@ObjectType()
class Greeting {
  @Field(() => Date)
  timestamp!: Date
  @Field(() => String)
  message!: string
}

@ArgsType()
class JoinArgs {
  @Field(() => String, { nullable: false })
  name!: string
}

@Resolver(Greeting)
class TestResolver {
  @Query(() => Greeting)
  knock(): string {
    return `this is a meeting room. anyone joined can speak and listen`
  }

  @Mutation()
  join(@Args() {}: JoinArgs, @PubSub() pubSub: PubSubEngine) {}

  @Mutation()
  speak(@Args() {}: JoinArgs, @PubSub() pubSub: PubSubEngine) {}

  @Subscription({ topics: ({ args }) => args.name || `bro` })
  listen(@Args() {}: GreetArgs, @Root() n: string): Greeting {
    return greet(n)
  }
}

export const schema = buildSchemaSync({
  resolvers: [TestResolver],
  validate: false,
})
