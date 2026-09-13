import { Database, ExternalLink } from 'lucide-react-native';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

export default function SupabaseSetupScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Database color="#171717" size={32} />
        <Text style={styles.title}>Connect Supabase to continue</Text>
        <Text style={styles.body}>
          Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to this app after
          connecting your Supabase project. Auth and photo storage will then be enabled.
        </Text>
        <Pressable
          onPress={() => Linking.openURL('https://supabase.com/dashboard')}
          style={styles.button}
        >
          <ExternalLink color="#171717" size={17} />
          <Text style={styles.buttonText}>Open Supabase</Text>
        </Pressable>
      </View>
    </View>
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
  title: {
    color: '#171717',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 16,
  },
  body: {
    color: '#737373',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFC00',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  buttonText: {
    color: '#171717',
    fontWeight: '800',
  },
});