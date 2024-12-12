import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Icon, AddIcon, ChevronRightIcon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
} from "@/components/ui/alert-dialog";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// Grocery list data
const initialGroceryLists = [
  {
    id: 1,
    title: "Weekly Groceries",
    subtitle: "15 items • Created Today",
  },
  {
    id: 2,
    title: "Monthly Supplies",
    subtitle: "8 items • Created 4 days ago",
  },
  {
    id: 3,
    title: "Yearly Supplies",
    subtitle: "244 items • Created 2 years ago",
  },
];

// Main Component
export default function Index() {
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [groceryLists, setGroceryLists] = useState(initialGroceryLists);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [targetItemIdToEdit, setTargetItemIdToEdit] = useState(0);

  const handleButtonPressIn = () => {
    setButtonOpacity(0.6);
    router.push('/(input)/grocery');
  };
  const handleButtonPressOut = () => setButtonOpacity(1);

  const handleDelete = () => {
    // Remove the list with the given ID
    setGroceryLists(groceryLists.filter((list) => list.id !== targetItemIdToEdit));
    setShowEditDialog(false); // Close the dialog
  };

  const handleCancel = () => {
    setShowEditDialog(false); // Simply close the dialog without doing anything
  };

  const styles = {
    header: {
      fontSize: 32,
      fontWeight: 600,
      paddingTop: 60,
    },
    subheader: {
      fontSize: 16,
      marginBottom: 25,
    },
    container: {
      backgroundColor: "#FBF9F1",
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 30,
      paddingRight: 30,
      height: '100%'
    },
    createListButton: {
      backgroundColor: "#92C7CF",
      borderRadius: 30,
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      opacity: buttonOpacity,
    },
    createListText: {
      fontSize: 18,
      color: "white",
    },
    createListIcon: {
      marginTop: -3,
      color: "white",
    },
    listContainer: {
      backgroundColor: "white",
      padding: 22,
      marginTop: 20,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    listTitle: {
      textAlign: "center",
      marginTop: 5,
      marginBottom: 12,
      fontSize: 20,
      fontWeight: 600,
    },
    itemContainer: {
      marginTop: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#92C7CF',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 18,
      paddingBottom: 18,
      paddingLeft: 26,
      paddingRight: 26,
    },
    itemTitle: {
      fontSize: 14,
      fontWeight: 600,
    },
    itemSubtitle: {
      fontSize: 12,
    },
    alertDialogFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    editDialogButton: {
      backgroundColor: "#92C7CF",
    },
    deleteDialogButton: {
      backgroundColor: "#E195AB",
    },
    cancelDialogButton: {
      marginRight: 8,
    },
    actionDialogButton: {
      flexDirection: "row",
      justifyContent: "center",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.header}>My Groceries</Text>
      <Text style={styles.subheader}>Create and manage your shopping lists</Text>

      <Button
        size="md"
        variant="solid"
        action="primary"
        style={styles.createListButton}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
      >
        <Icon as={AddIcon} size="xl" style={styles.createListIcon} />
        <ButtonText style={styles.createListText}>Create New List</ButtonText>
      </Button>

      <Box style={styles.listContainer}>
        {groceryLists.map((list) => (
          <TouchableOpacity
            key={list.id}
            style={styles.itemContainer}
            onLongPress={() => {
              setTargetItemIdToEdit(list.id);
              setShowEditDialog(true);
            }}
          >
            <Box>
              <Text style={styles.itemTitle}>{list.title}</Text>
              <Text style={styles.itemSubtitle}>{list.subtitle}</Text>
            </Box>
            <Icon as={ChevronRightIcon} />
          </TouchableOpacity>
        ))}

        <AlertDialog isOpen={showEditDialog} onClose={handleCancel} size="md">
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading className="text-typography-950 font-semibold m-auto mt-2 mb-5" size="md">
                What to do with this grocery list?
              </Heading>
            </AlertDialogHeader>
            <AlertDialogFooter style={styles.alertDialogFooter}>
              <Button size="sm" style={styles.deleteDialogButton} onPress={handleDelete}>
                <ButtonText>Delete</ButtonText>
              </Button>

              <Box style={styles.actionDialogButton}>
                <Button size="sm" style={styles.editDialogButton}>
                  <ButtonText>Edit</ButtonText>
                </Button>
              </Box>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    </ScrollView>
    </SafeAreaView>
  );
}
