import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DefaultScreenPosts from '../nested/PostsDefault';
import CommentsScreen from '../nested/Comments';
import MapScreen from '../nested/Map';

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
