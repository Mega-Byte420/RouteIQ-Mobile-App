// MultiSelectDropdown.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import GlobalIcon from './GlobalIcon';

const students = [
  {
    id: 1,
    name: 'Mark Tommay',
    avatar: require('../assets/images/JacobJones.png'),
  },
  {
    id: 2,
    name: 'Lisa Tommay',
    avatar: require('../assets/images/ShonaMor.png'),
  },
  {id: 3, name: 'Cheng Tommay', avatar: require('../assets/images/MeeAo.png')},
];

const MultiSelectDropdown = () => {
  const [selected, setSelected] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  const toggleSelect = (student: any) => {
    if (selected.find(s => s.id === student.id)) {
      setSelected(selected.filter(s => s.id !== student.id));
    } else {
      setSelected([...selected, student]);
    }
  };

  const removeSelected = (id: number) => {
    setSelected(selected.filter(s => s.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Child</Text>

      <TouchableOpacity
        style={styles.dropdownBox}
        onPress={() => setVisible(true)}>
        <View style={styles.selectedList}>
          {selected.length === 0 ? (
            <Text style={styles.placeholder}>Select</Text>
          ) : (
            selected.map(student => (
              <View key={student.id} style={styles.selectedItem}>
                <Image source={student.avatar} style={styles.avatarSmall} />
                <Text style={styles.selectedText}>
                  {student.name.split(' ')[0]}
                </Text>
                <TouchableOpacity onPress={() => removeSelected(student.id)}>
                  <Icon name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        <View style={styles.iconWrapper}>
          <GlobalIcon
            library="FontAwesome"
            name="angle-down"
            size={24}
            color={AppColors.black}
          />
        </View>
      </TouchableOpacity>

      <Modal isVisible={visible}>
        <View style={styles.modalContainer}>
          {students.map(student => {
            const isSelected = selected.find(s => s.id === student.id);
            return (
              <TouchableOpacity
                key={student.id}
                style={styles.dropdownItem}
                onPress={() => toggleSelect(student)}>
                <Image source={student.avatar} style={styles.avatar} />
                <Text style={styles.name}>{student.name}</Text>
                {isSelected && <Icon name="check" size={20} color="green" />}
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.doneButton}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MultiSelectDropdown;

const styles = StyleSheet.create({
  container: {},
  label: {
    fontFamily: AppFonts.NunitoSansBold,
    marginBottom: 5,
    color: AppColors.black,
    fontSize: 16,
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 50,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    flex: 1,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C62828',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
  },
  selectedText: {
    color: AppColors.white,
    marginHorizontal: 5,
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: '80%',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderColor: '#ddd',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  name: {
    flex: 1,
    color: AppColors.black
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneText: {
    color: AppColors.white,
  },
  placeholder: {
  color: AppColors.lightGrey,
  fontSize: 16,
  paddingHorizontal: 5,
  paddingVertical: 4,
  fontFamily:AppFonts.NunitoSansSemiBold
},

iconWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: 5,
},
});
