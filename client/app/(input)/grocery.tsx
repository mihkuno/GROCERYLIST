import React, { useState, useEffect } from "react";
import { ScrollView, Pressable, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon, AddIcon, ArrowLeftIcon, RemoveIcon, TrashIcon, CheckIcon, EditIcon } from "@/components/ui/icon";
import { Checkbox, CheckboxIndicator, CheckboxIcon } from "@/components/ui/checkbox";
import { Input, InputField } from "@/components/ui/input";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogBody,
  } from '@/components/ui/alert-dialog';

const styles = {
    container: {
        backgroundColor: "#FBF9F1",
        padding: 30,
        paddingTop: 60,
        paddingBottom: 170,
        flexGrow: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "600",
    },
    headerInput: {
        flex: 1,
    },
    backButton: {
        backgroundColor: "#92C7CF",
        borderRadius: 10,
        padding: 18,
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    backIcon: {
        color: "white",
    },
    cartContainer: {
        padding: 22,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        minHeight: 270,
        height: "52%",
    },
    addItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    addItemText: {
        fontSize: 16,
        fontWeight: "600",
    },
    addItemButton: {
        backgroundColor: "#AAD7D9",
        borderRadius: 30,
        padding: 5
    },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#92C7CF",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        // opacity: 0.5,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxLabel: {
        marginLeft: 10,
    },
    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    stepButton: {
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
    },
    editButton: {
        backgroundColor: "#FBF9F1",
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    trashButton: {
        backgroundColor: "#fae8e3",
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    summaryContainer: {
        marginTop: 10,
        paddingTop: 30,
        paddingBottom: 5,
        paddingHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    summaryText: {
        fontSize: 17,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    summaryRowText: {
        // fontSize: 16,
        // fontWeight: 600,
    },
    summaryRowTotal: {
        fontWeight: 600,
        fontSize: 15,
        paddingVertical: 10,
    },
    saveButton: {
        backgroundColor: "#92C7CF",
        borderRadius: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },
    saveText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    actionButtonContainer: {
        flexDirection: "row",
    }
};


function AddItemButton({ onSave }) {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  
  const handleClose = () => setShowAlertDialog(false);

  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);

  const onNameChange = (value) => {
      setNameInput(value);
  };

  const onPriceChange = (value) => {
      setPriceInput(value);
  };

  const handleSave = () => {
    if (!nameInput) return;

    onSave({ name: nameInput, price: priceInput });
    setNameInput("");
    setPriceInput(0);
    handleClose();
  };

  return (
    <>
      <PressableButton onPress={() => setShowAlertDialog(true)} style={styles.addItemButton}>
        <Icon as={AddIcon} size="xl" color="white" />
      </PressableButton>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={handleClose}
        size="md"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              What do you want to add?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mb-2 h-30"
            >
              <InputField 
                placeholder="Name" 
                onChangeText={onNameChange} // Handle name input changes
            />
            </Input>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mb-2 h-30"
            >
              <InputField
                placeholder="Price"
                keyboardType="numeric" // Set the keyboard type to numeric
                onChangeText={onPriceChange} // Handle price input changes
              />
            </Input>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            {/* <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button> */}
            <Button size="sm" onPress={handleSave} className="bg-[#92C7CF]">
              <ButtonText>Save</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}


function EditItemDialog({ showEditDialog, showEditDialogCallback, editItemData, editCartItemCallback }) {
    
    const [newItemData, setNewItemData] = useState(editItemData);

    const handleClose = () => showEditDialogCallback(false);

    const handleSave = () => {
        if (newItemData.name == '') return;
        editCartItemCallback(editItemData.id, newItemData);
        handleClose();
    }
    
    const handleRemove = () => {
        editCartItemCallback(editItemData.id, null);
        handleClose();
    }

    return (
        <AlertDialog isOpen={showEditDialog} onClose={handleClose}>
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogBody className="mt-3 mb-4">
                    <Input
                        variant="outline"
                        size="md"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        className="mb-2 h-30"
                    >
                        <InputField 
                            placeholder="Name"
                            defaultValue={editItemData.name} 
                            onChangeText={(value) => setNewItemData({ ...newItemData, name: value })}
                        />
                    </Input>
                    <Input
                        variant="outline"
                        size="md"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        className="mb-2 h-30"
                    >
                        <InputField 
                            placeholder="Price"
                            defaultValue={parseFloat(editItemData.price).toFixed(2)}
                            onChangeText={(value) => setNewItemData({ ...newItemData, price: value })}
                            keyboardType="numeric" 
                        />
                    </Input>
                </AlertDialogBody>
                <AlertDialogFooter style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Button
                        style={{backgroundColor: '#E195AB'}}
                        variant="solid"
                        size="sm"
                        onPress={handleRemove}
                    >
                        <ButtonText>Remove</ButtonText>
                    </Button>

                    <Box style={{flexDirection: 'row'}}>
                        {/* <Button
                            variant="outline"
                            action="secondary"
                            size="sm"
                            onPress={handleClose}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                         */}
                        <Button
                            size="sm"
                            onPress={handleSave}
                            className="bg-[#92C7CF]"
                            style={{marginLeft: 8}}    
                        >
                            <ButtonText>Save</ButtonText>
                        </Button>
                    </Box>
                
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


function PressableButton({ children, onPress, style }) {
    const [opacity, setOpacity] = useState(1);

    return (
        <Pressable
            onPressIn={() => setOpacity(0.6)}
            onPressOut={() => setOpacity(1)}
            onPress={onPress}
            style={[style, { opacity }]}
        >
            {children}
        </Pressable>
    );
}

export default function Grocery() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Milk", price: 5, quantity: 23, isChecked: false },
        { id: 2, name: "Eggs", price: 12, quantity: 10, isChecked: false },
        { id: 3, name: "Bread", price: 20, quantity: 5, isChecked: false },
        { id: 4, name: "Butter", price: 15, quantity: 2, isChecked: false },
    ]);

    const updateQuantity = (id, delta) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const toggleCheckbox = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const handleAddItemSave = (item) => {

        if (!item.name) return;

        setCartItems((prevItems) => [
            ...prevItems,
            {
                id: prevItems.length + 1,
                name: item.name,
                price: item.price,
                quantity: 1,
                isChecked: false,
            },
        ]);
    };

    const editItem = (id, newData) => {
        if (newData === null) {
            // Remove item logic and reassign IDs
            setCartItems(prevCartItems => {
                // Remove the item with the given id
                const updatedItems = prevCartItems.filter(item => item.id !== id);
    
                // Reassign IDs to make them consecutive
                return updatedItems.map((item, index) => ({
                    ...item,
                    id: index + 1 // Reassign ID starting from 1
                }));
            });
        } else {
            // Update the cart with new data
            setCartItems(prevCartItems => 
                prevCartItems.map(item => item.id === id ? { ...item, ...newData } : item)
            );
        }
    };
    
    const [headerTitle, setHeaderTitle] = useState("");
    const [isHeaderClicked, setIsHeaderClicked] = useState(false);
    const [summary, setSummary] = useState({
        items: 0,
        itemsChecked: 0,
        totalAmountInAllItems: 0,
        totalAmountToPay: 0,
    });

    useEffect(() => {
        const itemsChecked = cartItems.filter(item => item.isChecked).length;
        const totalAmountToPay = cartItems.reduce(
            (total, item) => total + (item.isChecked ? item.price * item.quantity : 0),
            0
        );
        const totalAmountInAllItems = cartItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );
        setSummary({
            items: cartItems.length,
            itemsChecked,
            totalAmountInAllItems,
            totalAmountToPay,
        });
    }, [cartItems]);
    

    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editItemData, setEditItemData] = useState({});
    
    
    const handleItemLongPress = (itemData) => {
        setEditItemData(itemData);
        setShowEditDialog(true);
    };

    return (
        <Box style={styles.container}>
           <Box style={styles.headerContainer}>
            <PressableButton style={styles.backButton}>
                <Icon as={ArrowLeftIcon} size="xl" style={styles.backIcon} />
            </PressableButton>

           {
            isHeaderClicked ?
            <Text style={styles.header} onPress={()=>setIsHeaderClicked(false)}>{headerTitle}</Text>
            :
            <Input
                style={styles.headerInput}
                variant="underlined"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="h-22"
            >
            <InputField 
                placeholder="Enter Title here..." 
                onBlur={()=>setIsHeaderClicked(true)} 
                onChangeText={(value)=>setHeaderTitle(value)}
                value={headerTitle}
                className="font-semibold"
            />
            </Input>
           } 

        </Box>


            <Box style={styles.cartContainer}>
                <Box style={styles.addItemContainer}>
                    <Text style={styles.addItemText}>Add new item...</Text>
                    <AddItemButton onSave={handleAddItemSave} />
                </Box>

                <ScrollView>
                    {cartItems.map((item) => (
                        <TouchableOpacity key={item.id} onLongPress={() => handleItemLongPress(item)}>
                        <Box key={item.id} style={styles.cartItem}>
                            <Box style={styles.checkboxContainer}>
                            <Checkbox
                                size="lg"                            
                                isChecked={item.isChecked}
                                onChange={() => toggleCheckbox(item.id)}
                            >
                                <CheckboxIndicator>
                                    <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>
                            </Checkbox>
                                <Box style={styles.checkboxLabel}>
                                    <Text style={{maxWidth: 120, textOverflow: 'elipsis'}}>{item.name}</Text>
                                    <Text>₱{parseFloat(item.price).toFixed(2)}</Text>
                                </Box>
                            </Box>

                            <Box style={styles.stepContainer}>
                                <PressableButton
                                    style={styles.stepButton}
                                    onPress={() => updateQuantity(item.id, -1)}
                                >
                                    <Icon as={RemoveIcon} size="sm" />
                                </PressableButton>
                                <Text>{item.quantity}</Text>
                                <PressableButton
                                    style={styles.stepButton}
                                    onPress={() => updateQuantity(item.id, 1)}
                                >
                                    <Icon as={AddIcon} size="sm" />
                                </PressableButton>
                            </Box>
                            
                        </Box>
                        </TouchableOpacity>
                    ))}

                    <EditItemDialog 
                        showEditDialog={showEditDialog} 
                        showEditDialogCallback={setShowEditDialog}
                        editItemData={editItemData} 
                        editCartItemCallback={editItem} />

                </ScrollView>
            </Box>

            <Box style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Summary</Text>
                <Box>
                    <Box style={styles.summaryRow}>
                        <Text style={styles.summaryRowText}>No. of Items:</Text>
                        <Text>{summary.items}</Text>
                    </Box>
                    <Box style={styles.summaryRow}>
                        <Text style={styles.summaryRowText}>Items Checked:</Text>
                        <Text>{summary.itemsChecked}</Text>
                    </Box>
                    <Box style={styles.summaryRow}>
                        <Text style={styles.summaryRowText}>Total Cost In All items:</Text>
                        <Text>₱{parseFloat(summary.totalAmountInAllItems).toFixed(2)}</Text>
                    </Box>
                    <Divider />
                    <Box style={styles.summaryRow}>
                        <Text style={styles.summaryRowTotal}>Total Cost To Pay:</Text>
                        <Text style={styles.summaryRowTotal}>₱{parseFloat(summary.totalAmountToPay).toFixed(2)}</Text>
                    </Box>
                </Box>  
            </Box>
                    
            <PressableButton style={styles.saveButton}>
                <Text style={styles.saveText}>Complete</Text>
            </PressableButton>
        </Box>
    );
}