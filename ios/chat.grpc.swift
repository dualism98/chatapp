//
// DO NOT EDIT.
//
// Generated by the protocol buffer compiler.
// Source: chat.proto
//

//
// Copyright 2018, gRPC Authors All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import GRPC
import NIO
import NIOConcurrencyHelpers
import SwiftProtobuf


/// Usage: instantiate `ChatServiceClient`, then call methods of this protocol to make API calls.
internal protocol ChatServiceClientProtocol: GRPCClient {
  var serviceName: String { get }
  var interceptors: ChatServiceClientInterceptorFactoryProtocol? { get }

  func createUser(
    _ request: CreateUserReq,
    callOptions: CallOptions?
  ) -> UnaryCall<CreateUserReq, User>

  func getAllChats(
    _ request: UserReq,
    callOptions: CallOptions?
  ) -> UnaryCall<UserReq, ChatList>
}

extension ChatServiceClientProtocol {
  internal var serviceName: String {
    return "ChatService"
  }

  /// Unary call to createUser
  ///
  /// - Parameters:
  ///   - request: Request to send to createUser.
  ///   - callOptions: Call options.
  /// - Returns: A `UnaryCall` with futures for the metadata, status and response.
  internal func createUser(
    _ request: CreateUserReq,
    callOptions: CallOptions? = nil
  ) -> UnaryCall<CreateUserReq, User> {
    return self.makeUnaryCall(
      path: ChatServiceClientMetadata.Methods.createUser.path,
      request: request,
      callOptions: callOptions ?? self.defaultCallOptions,
      interceptors: self.interceptors?.makecreateUserInterceptors() ?? []
    )
  }

  /// Unary call to getAllChats
  ///
  /// - Parameters:
  ///   - request: Request to send to getAllChats.
  ///   - callOptions: Call options.
  /// - Returns: A `UnaryCall` with futures for the metadata, status and response.
  internal func getAllChats(
    _ request: UserReq,
    callOptions: CallOptions? = nil
  ) -> UnaryCall<UserReq, ChatList> {
    return self.makeUnaryCall(
      path: ChatServiceClientMetadata.Methods.getAllChats.path,
      request: request,
      callOptions: callOptions ?? self.defaultCallOptions,
      interceptors: self.interceptors?.makegetAllChatsInterceptors() ?? []
    )
  }
}

#if compiler(>=5.6)
@available(*, deprecated)
extension ChatServiceClient: @unchecked Sendable {}
#endif // compiler(>=5.6)

@available(*, deprecated, renamed: "ChatServiceNIOClient")
internal final class ChatServiceClient: ChatServiceClientProtocol {
  private let lock = Lock()
  private var _defaultCallOptions: CallOptions
  private var _interceptors: ChatServiceClientInterceptorFactoryProtocol?
  internal let channel: GRPCChannel
  internal var defaultCallOptions: CallOptions {
    get { self.lock.withLock { return self._defaultCallOptions } }
    set { self.lock.withLockVoid { self._defaultCallOptions = newValue } }
  }
  internal var interceptors: ChatServiceClientInterceptorFactoryProtocol? {
    get { self.lock.withLock { return self._interceptors } }
    set { self.lock.withLockVoid { self._interceptors = newValue } }
  }

  /// Creates a client for the ChatService service.
  ///
  /// - Parameters:
  ///   - channel: `GRPCChannel` to the service host.
  ///   - defaultCallOptions: Options to use for each service call if the user doesn't provide them.
  ///   - interceptors: A factory providing interceptors for each RPC.
  internal init(
    channel: GRPCChannel,
    defaultCallOptions: CallOptions = CallOptions(),
    interceptors: ChatServiceClientInterceptorFactoryProtocol? = nil
  ) {
    self.channel = channel
    self._defaultCallOptions = defaultCallOptions
    self._interceptors = interceptors
  }
}

internal struct ChatServiceNIOClient: ChatServiceClientProtocol {
  internal var channel: GRPCChannel
  internal var defaultCallOptions: CallOptions
  internal var interceptors: ChatServiceClientInterceptorFactoryProtocol?

  /// Creates a client for the ChatService service.
  ///
  /// - Parameters:
  ///   - channel: `GRPCChannel` to the service host.
  ///   - defaultCallOptions: Options to use for each service call if the user doesn't provide them.
  ///   - interceptors: A factory providing interceptors for each RPC.
  internal init(
    channel: GRPCChannel,
    defaultCallOptions: CallOptions = CallOptions(),
    interceptors: ChatServiceClientInterceptorFactoryProtocol? = nil
  ) {
    self.channel = channel
    self.defaultCallOptions = defaultCallOptions
    self.interceptors = interceptors
  }
}

#if compiler(>=5.6)
@available(macOS 10.15, iOS 13, tvOS 13, watchOS 6, *)
internal protocol ChatServiceAsyncClientProtocol: GRPCClient {
  static var serviceDescriptor: GRPCServiceDescriptor { get }
  var interceptors: ChatServiceClientInterceptorFactoryProtocol? { get }

  func makeCreateUserCall(
    _ request: CreateUserReq,
    callOptions: CallOptions?
  ) -> GRPCAsyncUnaryCall<CreateUserReq, User>

  func makeGetAllChatsCall(
    _ request: UserReq,
    callOptions: CallOptions?
  ) -> GRPCAsyncUnaryCall<UserReq, ChatList>
}

@available(macOS 10.15, iOS 13, tvOS 13, watchOS 6, *)
extension ChatServiceAsyncClientProtocol {
  internal static var serviceDescriptor: GRPCServiceDescriptor {
    return ChatServiceClientMetadata.serviceDescriptor
  }

  internal var interceptors: ChatServiceClientInterceptorFactoryProtocol? {
    return nil
  }

  internal func makeCreateUserCall(
    _ request: CreateUserReq,
    callOptions: CallOptions? = nil
  ) -> GRPCAsyncUnaryCall<CreateUserReq, User> {
    return self.makeAsyncUnaryCall(
      path: ChatServiceClientMetadata.Methods.createUser.path,
      request: request,
      callOptions: callOptions ?? self.defaultCallOptions,
      interceptors: self.interceptors?.makecreateUserInterceptors() ?? []
    )
  }

  internal func makeGetAllChatsCall(
    _ request: UserReq,
    callOptions: CallOptions? = nil
  ) -> GRPCAsyncUnaryCall<UserReq, ChatList> {
    return self.makeAsyncUnaryCall(
      path: ChatServiceClientMetadata.Methods.getAllChats.path,
      request: request,
      callOptions: callOptions ?? self.defaultCallOptions,
      interceptors: self.interceptors?.makegetAllChatsInterceptors() ?? []
    )
  }
}

@available(macOS 10.15, iOS 13, tvOS 13, watchOS 6, *)
extension ChatServiceAsyncClientProtocol {
  internal func createUser(
    _ request: CreateUserReq,
    callOptions: CallOptions? = nil
  ) async throws -> User {
    return try await self.performAsyncUnaryCall(
      path: ChatServiceClientMetadata.Methods.createUser.path,
      request: request,
      callOptions: callOptions ?? self.defaultCallOptions,
      interceptors: self.interceptors?.makecreateUserInterceptors() ?? []
    )
  }

  internal func getAllChats(
    _ request: UserReq,
    callOptions: CallOptions? = nil
  ) async throws -> ChatList {
    return try await self.performAsyncUnaryCall(
      path: ChatServiceClientMetadata.Methods.getAllChats.path,
      request: request,
      callOptions: callOptions ?? self.defaultCallOptions,
      interceptors: self.interceptors?.makegetAllChatsInterceptors() ?? []
    )
  }
}

@available(macOS 10.15, iOS 13, tvOS 13, watchOS 6, *)
internal struct ChatServiceAsyncClient: ChatServiceAsyncClientProtocol {
  internal var channel: GRPCChannel
  internal var defaultCallOptions: CallOptions
  internal var interceptors: ChatServiceClientInterceptorFactoryProtocol?

  internal init(
    channel: GRPCChannel,
    defaultCallOptions: CallOptions = CallOptions(),
    interceptors: ChatServiceClientInterceptorFactoryProtocol? = nil
  ) {
    self.channel = channel
    self.defaultCallOptions = defaultCallOptions
    self.interceptors = interceptors
  }
}

#endif // compiler(>=5.6)

internal protocol ChatServiceClientInterceptorFactoryProtocol: GRPCSendable {

  /// - Returns: Interceptors to use when invoking 'createUser'.
  func makecreateUserInterceptors() -> [ClientInterceptor<CreateUserReq, User>]

  /// - Returns: Interceptors to use when invoking 'getAllChats'.
  func makegetAllChatsInterceptors() -> [ClientInterceptor<UserReq, ChatList>]
}

internal enum ChatServiceClientMetadata {
  internal static let serviceDescriptor = GRPCServiceDescriptor(
    name: "ChatService",
    fullName: "ChatService",
    methods: [
      ChatServiceClientMetadata.Methods.createUser,
      ChatServiceClientMetadata.Methods.getAllChats,
    ]
  )

  internal enum Methods {
    internal static let createUser = GRPCMethodDescriptor(
      name: "createUser",
      path: "/ChatService/createUser",
      type: GRPCCallType.unary
    )

    internal static let getAllChats = GRPCMethodDescriptor(
      name: "getAllChats",
      path: "/ChatService/getAllChats",
      type: GRPCCallType.unary
    )
  }
}

