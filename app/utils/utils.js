
import React from 'react';
import {
    Dimensions
} from 'react-native';

const GUIDELINE_BASE_WIDTH = 350;
const fullWidth = Dimensions.get('window').width;

export const scale = (value: number, factor: number = 0.4): number => value + ((fullWidth / GUIDELINE_BASE_WIDTH) * value - value) * factor;