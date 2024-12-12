import React, { useState, createRef } from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input, InputField } from "@/components/ui/input";
import { Icon, EyeOffIcon, EyeIcon, CloseIcon } from '@/components/ui/icon';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showErase, setShowErase] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoginPressed, setIsLoginPressed] = useState(false);
    const [isGooglePressed, setIsGooglePressed] = useState(false);
    const [isSignUpPressed, setIsSignUpPressed] = useState(false);

    const emailInput = createRef();
    const passwordInput = createRef();
    const confirmPasswordInput = createRef();

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
            flex: 1,
            justifyContent: 'center',
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 15,
            paddingRight: 15,
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
            opacity: isLoginPressed ? 0.6 : 1,
        },
        googleButton: {
            borderRadius: 10,
            height: 50,
            opacity: isGooglePressed ? 0.6 : 1,
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
            opacity: isSignUpPressed ? 0.6 : 1,
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
        setShowErase(text.length > 0);
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
        setShowErase(false);
        emailInput.current?.focus();
    };

    const clearPassword = () => {
        setPassword('');
        passwordInput.current?.focus();
    };

    const clearConfirmPassword = () => {
        setConfirmPassword('');
        confirmPasswordInput.current?.focus();
    };

    const handleButtonPressIn = (button: string) => {
        if (button === 'login') setIsLoginPressed(true);
        if (button === 'google') setIsGooglePressed(true);
        if (button === 'signup') setIsSignUpPressed(true);
    };

    const handleButtonPressOut = (button: string) => {
        if (button === 'login') setIsLoginPressed(false);
        if (button === 'google') setIsGooglePressed(false);
        if (button === 'signup') setIsSignUpPressed(false);
    };

    return (
        <Box style={styles.container}>
            <Text style={styles.brandName}>GroceryList</Text>
            <Box style={styles.formContainer}>
                <Text style={styles.header}>Create an account</Text>
                <Text style={styles.subheader}>Let's get started by filling out the form below.</Text>

                <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                    <InputField
                        ref={emailInput}
                        placeholder="Email"
                        onChangeText={handleEmailChanged}
                        value={email}
                    />
                    {showErase && (
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

                <Button
                    size="xl"
                    variant="solid"
                    action="primary"
                    style={styles.signInButton}
                    onPressIn={() => handleButtonPressIn('login')}
                    onPressOut={() => handleButtonPressOut('login')}
                >
                    <ButtonText>Create Account</ButtonText>
                </Button>

                <Box style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Already have an account? </Text>
                    <Button
                        style={styles.signUpButton}
                        onPressIn={() => handleButtonPressIn('signup')}
                        onPressOut={() => handleButtonPressOut('signup')}
                        variant="link"
                    >
                        <Text style={styles.signUpButton}>Sign In Here</Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
