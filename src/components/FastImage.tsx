'use strict';
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  ColorValue,
  ImageSourcePropType,
  StyleSheet,
  View
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface fastImageLoadingProp {
  style?: FastImageProps['style'];
  placeholderImage: ImageSourcePropType;
  loaderSize?: number;
  placeHolderImageStyle?: FastImageProps['style'];
  backgroundColor?: ColorValue;
  children?: React.ReactNode;
  loaderColor?: ColorValue;
}

const FastImageLoading = (props: fastImageLoadingProp & FastImageProps) => {
  const {
    style,
    placeholderImage,
    loaderSize,
    children,
    placeHolderImageStyle,
    backgroundColor,
    loaderColor = '#316fd3',
    ...otherProps
  } = props;

  const [Status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading',
  );

  const renderPlaceholder = useCallback(() => {
    return (
      <FastImage
        resizeMode={'cover'}
        source={placeholderImage}
        style={[styles.placeHolderImage, placeHolderImageStyle]}
      />
    );
  }, [placeholderImage, placeHolderImageStyle]);

  const CachedImageMemoized = useMemo(() => {
    return (
      <FastImage
        {...otherProps}
        style={[styles.ActualImage, style]}
        onError={setStatus.bind(null, 'error')}
        onLoad={setStatus.bind(null, 'success')}>
        {children}
      </FastImage>
    );
  }, [otherProps, children, style]);

  return (
    <View style={[styles.outerView, style]}>
      {CachedImageMemoized}
      {Status === 'loading' && renderPlaceholder()}
      {Status === 'error' && renderPlaceholder()}
    </View>
  );
};

const styles = StyleSheet.create({
  outerView: {overflow: 'hidden', backgroundColor: '#f1f1f1'},
  placeHolderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: -1,
  },
  ActualImage: {height: '100%', width: '100%'},
});

export default memo(FastImageLoading);
