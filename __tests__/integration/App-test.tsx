/**
 * @format
 */

import 'react-native';
import React from 'react';

import {render} from '@testing-library/react-native';
import {Text, View} from 'react-native';
import {Realm, createRealmContext} from '@realm/react';

class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;

  static generate(description: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: {type: 'bool', default: false},
      createdAt: 'date',
    },
  };
}

const {RealmProvider} = createRealmContext({
  schema: [Task],
  inMemory: true,
});

describe('realm tests', () => {
  afterEach(() => {
    Realm.clearTestState();
  }, 0);

  it('renders correctly', () => {
    const App = () => {
      return (
        <View style={{flex: 1}}>
          <RealmProvider fallback={<Text>Loading...</Text>}>
            <Text>Screen rendered</Text>
          </RealmProvider>
        </View>
      );
    };
    render(<App />);
    expect(true).toBeTruthy();
  });
});
