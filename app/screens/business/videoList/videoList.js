import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Touchable } from "react-native";

import { Button, Input, Header } from "../../../components";
import styles from "./style";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  COMMON_COLOR,GRADIENT_COLOR_NEW2
} from "./../../../utils/constants";
import ViewModel from '../viewModel/viewModel'
import DeleteModel from '../deleteModel/deleteModel'
import StringsOfLanguages from "../../../utils/translations";


const Data = [{
  "fileid": 137,
  "businessid": 46,
  "filetype": "video",
  "title": "My first Video",
  "description": "hello",
  "filefile": "1647242139307_big_buck_bunny_720p_1mb.mp4",

}, {
  "fileid": 138,
  "businessid": 46,
  "filetype": "video",
  "title": "My first Video",
  "description": "hello",
  "filefile": "1647242139307_big_buck_bunny_720p_1mb.mp4",

}, {
  "fileid": 139,
  "businessid": 46,
  "filetype": "video",
  "title": "My first Video",
  "description": "hello",
  "filefile": "1647242139307_big_buck_bunny_720p_1mb.mp4",

}]

const videoList = ({
  filetype
}) => {
  const [viewModel, setViewModel] = useState(false)
  const [deleteModel, setDeleteModel] = useState(false)

  const Viewmodelshow = (typecheck) => {
    typecheck === 1 ? setViewModel(!viewModel) : setDeleteModel(!deleteModel)
  }

  const renderItem = ({ item }) => (
    <View style={styles.mainvideo}>

      <View style={styles.mainvideotop}>
        <View style={styles.nametag}>
          <Text style={styles.namelable}>{StringsOfLanguages.NAME}</Text>
          <Text style={styles.namevalue}>{item.title}</Text>
        </View>
        <View style={styles.nametag}>
          <Text style={styles.namelable}>{StringsOfLanguages.URL}</Text>
          <Text style={styles.namevalue}>{StringsOfLanguages.LINK}</Text>
        </View>
        <View style={[styles.nametag]}>
          <Text style={[styles.namelable, { marginTop: 5 }]}>{StringsOfLanguages.DATE}</Text>
          <Text style={[styles.namevalue, { marginTop: 5 }]}>{StringsOfLanguages.dd_mm_yyyy}</Text>
        </View>
      </View>

      <View style={styles.mainvideobottum}>

        <View style={styles.mainvideoview}>
          <Icon name="eye" size={28} color={GRADIENT_COLOR_NEW2} />
        </View>
        <TouchableOpacity onPress={() => Viewmodelshow(1)} style={styles.mainvideoview}>
          <Icon name="edit" size={28} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Viewmodelshow(2)} style={styles.mainvideoview}>
          <Icon name="trash" size={28} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>
      </View>

    </View>
  );



  return (
    <View>
      <TouchableOpacity onPress={() => Viewmodelshow(1)} style={[styles.mainvideoview, { alignSelf: 'flex-end' }]} >
        <Icon name="plus" size={25} color={GRADIENT_COLOR_NEW2} />
      </TouchableOpacity>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {viewModel &&
        <ViewModel
          viewModel={viewModel}
          setViewModel={setViewModel}
          filetype={filetype} />}
      {deleteModel &&
        <DeleteModel
          deleteModel={deleteModel}
          setDeleteModel={setDeleteModel}
          filetype={filetype} />}
    </View>
  );
};
export default videoList;
