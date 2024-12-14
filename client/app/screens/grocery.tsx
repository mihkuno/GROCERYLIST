import React, { useState, useEffect, useContext } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { SessionContext } from "@/provider/SessionProvider";


const styles = {
    container: {
        backgroundColor: "#FBF9F1",
    },
    scrollView: {
        padding: 20,
        height: "100%",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "600",
        width: '75%'
    },
    headerInput: {
        // flex: 1,
        width: '75%'
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
        marginTop: 15,
        marginBottom: 50,

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
    if (!nameInput) alert('Name cannot be empty');

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
                onChangeText={(value) => {
                  // Ensure price is a valid number
                  const parsedPrice = parseFloat(value);
                  // If parsedPrice is NaN, set it to a default value (e.g., 0.00)
                  onPriceChange(isNaN(parsedPrice) ? '0.00' : value);
                }}
              />
            </Input>
          </AlertDialogBody>
          <AlertDialogFooter className="">
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
        if (newItemData.name == '') alert('Name cannot be empty');
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
                            defaultValue={isNaN(parseFloat(editItemData.price)) ? '0.00' : parseFloat(editItemData.price).toFixed(2)}
                            onChangeText={(value) => {
                                // Ensure the price is a valid number before updating
                                const parsedPrice = parseFloat(value);
                                setNewItemData({ ...newItemData, price: isNaN(parsedPrice) ? 0 : parsedPrice });
                            }}
                            keyboardType="numeric" 
                        />
                    </Input>
                </AlertDialogBody>
                <AlertDialogFooter style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                        style={{ backgroundColor: '#E195AB' }}
                        variant="solid"
                        size="sm"
                        onPress={handleRemove}
                    >
                        <ButtonText>Remove</ButtonText>
                    </Button>
    
                    <Box style={{ flexDirection: 'row' }}>
                        <Button
                            size="sm"
                            onPress={handleSave}
                            className="bg-[#92C7CF]"
                            style={{ marginLeft: 8 }}    
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

    const targetItem = useLocalSearchParams();
    const { getGroceryListDetails, updateGroceryListDetails, createGroceryList, addGroceryListItems, removeGroceryListItem } = useContext(SessionContext);

    // check if targetItemIdToEdit is not null
    const [headerTitle, setHeaderTitle] = useState('');
    const [isHeaderClicked, setIsHeaderClicked] = useState(false);
    const [summary, setSummary] = useState({
        items: 0,
        itemsChecked: 0,
        totalAmountInAllItems: 0,
        totalAmountToPay: 0,
    });

    const [data, setData] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [itemIdToRemove, setItemIdToRemove] = useState([]);

    useEffect(() => {
        
        if ('id' in targetItem) {
            setIsHeaderClicked(true);
        
            (async () => {
                const response = await getGroceryListDetails(targetItem.id);
                setData(response);
                setHeaderTitle(response.headerTitle);
                setCartItems(response.items);
            })();
        }
    }, []);


    const updateQuantity = (id, delta) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
            )
        );
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
                id: -1 * Math.random(),
                name: item.name,
                price: item.price,
                quantity: 1,
                isChecked: false,
            },
        ]);
    };

    const editItem = (id, newData) => {

        // item to remove
        if (newData === null) {
            // Remove item logic and reassign IDs
            setCartItems(prevCartItems => {
                // Remove the item with the given id
                const updatedItems = prevCartItems.filter(item => item.id !== id);
                return updatedItems;
            });
            setItemIdToRemove([...itemIdToRemove, id]);
        } 

        // item to edit
        else {
            // Update the cart with new data
            setCartItems(prevCartItems => 
                prevCartItems.map(item => item.id === id ? { ...item, ...newData } : item)
            );
        }
    };

    const handleComplete = async () => {

        // check if targeItem is local search param is {} or empty object
        
        if (Object.keys(targetItem).length === 0) {
            // creating a new grocery
            await createGroceryList(headerTitle, cartItems);             
        }

        else {
            // grocery is being edited
                
            // remove items in itemIdToRemove
            if (itemIdToRemove.length > 0) {
                console.log(itemIdToRemove);
                await removeGroceryListItem(itemIdToRemove);
            }

            // get items with negative id
            const itemsToAdd = cartItems.filter(item => item.id < 0);
            if (itemsToAdd.length > 0) {
                await addGroceryListItems(targetItem.id, itemsToAdd);
            } 

            data.items = cartItems;
            data.headerTitle = headerTitle;
            // only update the data without negative id
            const dataToUpdate = cartItems.filter(item => item.id > 0);
            await updateGroceryListDetails({ ...data, items: dataToUpdate });
        }

        router.back();
    };


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
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Box style={styles.headerContainer}>
                    <PressableButton style={styles.backButton} onPress={() => {router.back();}}>
                        <Icon as={ArrowLeftIcon} size="xl" style={styles.backIcon} />
                    </PressableButton>
    
                    {
                        isHeaderClicked ?
                        <Text style={styles.header} onPress={() => setIsHeaderClicked(false)}>{headerTitle}</Text>
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
                                onBlur={() => headerTitle !== '' ? setIsHeaderClicked(true) : setIsHeaderClicked(false)}
                                onChangeText={(value) => setHeaderTitle(value)}
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
                                        <Text style={{ maxWidth: 120, textOverflow: 'elipsis' }}>{item.name}</Text>
                                        <Text>₱{isNaN(parseFloat(item.price)) ? '0.00' : parseFloat(item.price).toFixed(2)}</Text>
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
                        editCartItemCallback={editItem}
                    />
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
                            <Text>₱{isNaN(parseFloat(summary.totalAmountInAllItems)) ? '0.00' : parseFloat(summary.totalAmountInAllItems).toFixed(2)}</Text>
                        </Box>
                        <Divider />
                        <Box style={styles.summaryRow}>
                            <Text style={styles.summaryRowTotal}>Total Cost To Pay:</Text>
                            <Text style={styles.summaryRowTotal}>₱{isNaN(parseFloat(summary.totalAmountToPay)) ? '0.00' : parseFloat(summary.totalAmountToPay).toFixed(2)}</Text>
                        </Box>
                    </Box>
                </Box>
    
                <PressableButton style={styles.saveButton} onPress={handleComplete}>
                    <Text style={styles.saveText}>Complete</Text>
                </PressableButton>
            </ScrollView>
        </SafeAreaView>
    );

    
}
