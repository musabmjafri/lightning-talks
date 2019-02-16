import { Deserializer, DeserializerOptions, Serializer, SerializerOptions } from 'jsonapi-serializer';

const defaultDeserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
};

const defaultSerializationOptions: SerializerOptions = {
  keyForAttribute: 'camelCase',
};

export function apiDeserializer(data: any, options?: DeserializerOptions): Promise<any> {
  return new Deserializer({ ...defaultDeserializerOptions, ...options }).deserialize(data);
}

export function apiSerializer(type: string, data: any, options?: SerializerOptions): any {
  return new Serializer(type, { ...defaultSerializationOptions, ...options }).serialize(data);
}
