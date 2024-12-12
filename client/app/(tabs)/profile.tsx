import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon, CloseIcon, CheckIcon } from '@/components/ui/icon';

const Index: React.FC = () => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'caindayjoeninyo@gmail.com',
    password: '***',
  });
  const [tempData, setTempData] = useState({ ...formData }); // Holds temporary edits

  const handleEdit = (field: string) => {
    setEditingItem(field);
    setTempData({ ...formData }); // Store the current values in tempData
  };

  const handleSave = () => {
    setFormData({ ...tempData }); // Save changes from tempData to formData
    setEditingItem(null);
    console.log('Saved:', tempData);
  };

  const handleCancel = () => {
    setTempData({ ...formData }); // Revert tempData to the original formData values
    setEditingItem(null);
  };

  const handleChange = (field: string, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value })); // Update tempData for edits
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.listContainer}>
        <Text style={styles.listTitle}>User Profile</Text>

        {/* Editable Items */}
        {['name', 'email', 'password'].map((field) => (
          <View key={field} style={styles.itemContainer}>
            {editingItem === field ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.textInput}
                  value={tempData[field as keyof typeof tempData] || ''}
                  onChangeText={(value) => handleChange(field, value)}
                  placeholder={`Enter ${field}`}
                />
                <TouchableOpacity onPress={handleCancel}>
                  <Icon as={CloseIcon} className="text-typography-500 m-2 w-4 h-4" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                  <Icon as={CheckIcon} className="text-typography-500 m-2 w-4 h-4" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => handleEdit(field)} style={styles.row}>
                <View>
                  <Text style={styles.itemTitle}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                  <Text style={styles.itemSubtitle}>{formData[field as keyof typeof formData]}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBF9F1',
    paddingVertical: 50,
    paddingHorizontal: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: 'white',
    padding: 22,
    marginTop: 50,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  listTitle: {
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: '600',
  },
  itemContainer: {
    marginTop: 12,
    paddingVertical: 18,
    paddingHorizontal: 26,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#92C7CF',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#92C7CF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#6e6e6e',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: '#E195AB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Index;
