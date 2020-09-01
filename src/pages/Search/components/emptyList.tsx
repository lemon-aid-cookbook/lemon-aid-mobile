import {CText} from 'components';
import React from 'react';
import {View} from 'react-native';

const EmptyList: React.FC = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <CText fontSize={16} style={{textAlign: 'center'}}>
        Danh sách trống.
      </CText>
    </View>
  );
};

export default EmptyList;
