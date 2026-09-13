import { LockKeyhole, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '@/lib/supabase';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!email.trim() || password.length < 6) {
      setErrorMessage('Enter an email and a password with at least 6 characters.');
      return;
    }

    setErrorMessage('');
    setInfoMessage('');
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (error) {
          throw error;
        }
        if (!data.session) {
          setInfoMessage('Check your email to confirm your account, then log in.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <View style={styles.card}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>s</Text>
        </View>
        <Text style={styles.title}>{isSignUp ? 'Create your account' : 'Welcome back'}</Text>
        <Text style={styles.subtitle}>
          {isSignUp
            ? 'Join Snapsgram and start sharing your moments.'
            : 'Log in to keep your Snaps and Insta Grid together.'}
        </Text>

        <View style={styles.inputWrap}>
          <Mail color="#737373" size={19} />
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#A3A3A3"
            style={styles.input}
            value={email}
          />
        </View>

        <View style={styles.inputWrap}>
          <LockKeyhole color="#737373" size={19} />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry
            style={styles.input}
            value={password}
          />
        </View>

        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        {!!infoMessage && <Text style={styles.info}>{infoMessage}</Text>}

        <Pressable
          disabled={isSubmitting}
          onPress={submit}
          style={({ pressed }) => [styles.submit, pressed && styles.pressed]}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#171717" />
          ) : (
            <Text style={styles.submitText}>{isSignUp ? 'Sign up' : 'Log in'}</Text>
          )}
        </Pressable>

        <Pressable onPress={() => setIsSignUp((current) => !current)} style={styles.switch}>
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account? ' : 'New to Snapsgram? '}
            <Text style={styles.switchAccent}>{isSignUp ? 'Log in' : 'Sign up'}</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderRadius: 22,
    borderWidth: 1,
    maxWidth: 430,
    padding: 24,
    width: '100%',
  },
  logo: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFC00',
    borderRadius: 23,
    height: 46,
    justifyContent: 'center',
    marginBottom: 16,
    width: 46,
  },
  logoText: {
    color: '#171717',
    fontSize: 28,
    fontWeight: '900',
  },
  title: {
    color: '#171717',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#737373',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  inputWrap: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderColor: '#E5E5E5',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 14,
    paddingHorizontal: 13,
  },
  input: {
    color: '#171717',
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  error: {
    color: '#DC2626',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 12,
  },
  info: {
    color: '#15803D',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 12,
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#FFFC00',
    borderRadius: 12,
    marginTop: 18,
    minHeight: 48,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  submitText: {
    color: '#171717',
    fontSize: 15,
    fontWeight: '800',
  },
  switch: {
    paddingTop: 18,
  },
  switchText: {
    color: '#737373',
    fontSize: 13,
    textAlign: 'center',
  },
  switchAccent: {
    color: '#171717',
    fontWeight: '800',
  },
});