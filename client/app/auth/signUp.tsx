import React, { useState, createRef, useContext } from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input, InputField } from "@/components/ui/input";
import { Icon, EyeOffIcon, EyeIcon, CloseIcon } from '@/components/ui/icon';
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SessionContext } from '@/provider/SessionProvider';
import axios from 'axios';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showEraseEmail, setShowEraseEmail] = useState(false);
    const [showEraseName, setShowEraseName] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const nameInput = createRef();
    const emailInput = createRef();
    const passwordInput = createRef();
    const confirmPasswordInput = createRef();

    const { createAccount } = useContext(SessionContext);

    const styles = {
        brandName: {
            fontSize: 40,
            fontWeight: 800,
            color: '#FBF9F1',
            textAlign: 'center',
            padding: 40,
        },
        header: {
            fontSize: 32,
            fontWeight: 500,
            paddingTop: 40,
        },
        subheader: {
            fontSize: 13,
            fontWeight: 500,
            marginTop: 10,
            marginBottom: 25,
        },
        container: {
            backgroundColor: '#92C7CF',
            justifyContent: 'center',
            paddingVertical: '25%',
            paddingHorizontal: 20,
            height: '100%',
        },
        formContainer: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 35,
            justifyContent: 'center',
        },
        formInput: {
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 10,
            height: 50,
        },
        formIcon: {
            marginRight: 12,
            color: '#8c8c8c',
        },
        signInButton: {
            fontWeight: 'bold',
            backgroundColor: '#92C7CF',
            borderRadius: 10,
            marginTop: 15,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        signInButtonText: {
            fontSize: 16,
            fontWeight: 800,
            color: 'white',
        },
        googleButton: {
            borderRadius: 10,
            height: 50,
        },
        signInText: {
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 20,
            fontWeight: 'bold',
            color: '#B4B4B8',
        },
        signUpText: {
            fontWeight: 'bold',
        },
        signUpButton: {
            fontWeight: 'bold',
            color: '#92C7CF',
        },
        signUpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
        },
    };

    const handleEmailChanged = (text: string) => {
        setEmail(text);
        setShowEraseEmail(text.length > 0);
    };

    
    const handleNameChanged = (text: string) => {
        setName(text);
        setShowEraseName(text.length > 0);
    };

    const handlePasswordChanged = (text: string) => {
        setPassword(text);
    };

    const handleConfirmPasswordChanged = (text: string) => {
        setConfirmPassword(text);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const clearEmail = () => {
        setEmail('');
        setShowEraseEmail(false);
        emailInput.current?.focus();
    };

    
    const clearName = () => {
        setName('');
        setShowEraseName(false);
        nameInput.current?.focus();
    };

    const clearPassword = () => {
        setPassword('');
        passwordInput.current?.focus();
    };

    const clearConfirmPassword = () => {
        setConfirmPassword('');
        confirmPasswordInput.current?.focus();
    };


    return (
        <Box style={styles.container}>
            <Text style={styles.brandName}>GroceryList</Text>
            <Box style={styles.formContainer}>
                <Text style={styles.header}>Create an account</Text>
                <Text style={styles.subheader}>Let's get started by filling out the form below.</Text>

                <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                    <InputField
                        ref={nameInput}
                        placeholder="Username"
                        onChangeText={handleNameChanged}
                        value={name}
                    />
                    {showEraseName && (
                        <Button variant="link" onPress={clearName}>
                            <Icon as={CloseIcon} size="xl" style={styles.formIcon} />
                        </Button>
                    )}
                </Input>


                <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                    <InputField
                        ref={emailInput}
                        placeholder="Email"
                        onChangeText={handleEmailChanged}
                        value={email}
                    />
                    {showEraseEmail && (
                        <Button variant="link" onPress={clearEmail}>
                            <Icon as={CloseIcon} size="xl" style={styles.formIcon} />
                        </Button>
                    )}
                </Input>

                
                <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                    <InputField
                        ref={passwordInput}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChangeText={handlePasswordChanged}
                        value={password}
                    />
                    <Button variant="link" onPress={togglePasswordVisibility}>
                        <Icon as={showPassword ? EyeOffIcon : EyeIcon} size="xl" style={styles.formIcon} />
                    </Button>
                    {password && (
                        <Button variant="link" onPress={clearPassword}>
                            <Icon as={CloseIcon} size="xl" style={styles.formIcon} />
                        </Button>
                    )}
                </Input>

                <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                    <InputField
                        ref={confirmPasswordInput}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        onChangeText={handleConfirmPasswordChanged}
                        value={confirmPassword}
                    />
                    <Button variant="link" onPress={toggleConfirmPasswordVisibility}>
                        <Icon as={showConfirmPassword ? EyeOffIcon : EyeIcon} size="xl" style={styles.formIcon} />
                    </Button>
                    {confirmPassword && (
                        <Button variant="link" onPress={clearConfirmPassword}>
                            <Icon as={CloseIcon} size="xl" style={styles.formIcon} />
                        </Button>
                    )}
                </Input>

                <TouchableOpacity
                    style={styles.signInButton}
                    activeOpacity={0.6}
                    onPress={() => createAccount(name, email, password, confirmPassword)}
                >
                    <Text style={styles.signInButtonText}>Create Account</Text>
                </TouchableOpacity>

                <Box style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Already have an account? </Text>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => router.replace('/auth/signIn')}
                        variant="link"
                        activeOpacity={0.6}
                    >
                        <Text style={styles.signUpButton} >Sign In Here</Text>
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    );
}
