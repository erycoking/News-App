import React, {useState, useEffect} from 'react';

import {StyleSheet} from 'react-native';
import {Text} from 'native-base';
import moment from 'moment';

const styles = StyleSheet.create({
  space: {
    marginHorizontal: 10,
  },
});

export interface ITimeProps {
  time?: string;
}

const TimeAgo = (props: ITimeProps) => {
  const {time} = props;

  const [timeFromNow, setTimeFromNow] = useState(
    moment(moment.now()).fromNow(),
  );

  useEffect(() => {
    if (time) {
      setTimeFromNow(moment(time).fromNow());
    }
  }, [time]);

  return (
    <Text note style={styles.space}>
      {timeFromNow}
    </Text>
  );
};

export default TimeAgo;
