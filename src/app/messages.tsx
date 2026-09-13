import { Camera, ChevronRight, Flame, MessageCircle, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const conversations = [
  { name: 'Maya', initials: 'M', color: '#E1306C', streak: 18, preview: 'You: that view 🔥' },
  { name: 'Arjun', initials: 'A', color: '#7C3AED', streak: 7, preview: 'Sent a Snap' },
  { name: 'Nisha', initials: 'N', color: '#F59E0B', streak: 42, preview: 'Keep it going!' },
];

export default function MessagesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>GOOD EVENING</Text>
          <Text style={styles.title}>Messages</Text>
        </View>
        <Pressable style={styles.addButton} accessibilityLabel="Start a new message">
          <Plus color="#fff" size={20} />
        </Pressable>
      </View>

      <View style={styles.streakCard}>
        <View style={styles.streakIcon}>
          <Flame color="#171717" fill="#FFFC00" size={27} />
        </View>
        <View style={styles.streakCopy}>
          <Text style={styles.streakTitle}>Your streaks</Text>
          <Text style={styles.streakSubtitle}>Keep the conversation glowing.</Text>
        </View>
        <Text style={styles.streakCount}>3</Text>
      </View>

      <View style={styles.quickActions}>
        <QuickAction icon={<Camera color="#171717" size={22} />} label="New Snap" />
        <QuickAction
          icon={<MessageCircle color="#171717" size={22} />}
          label="New chat"
        />
      </View>

      <Text style={styles.sectionTitle}>Chats</Text>
      {conversations.map((conversation) => (
        <Pressable key={conversation.name} style={styles.conversation}>
          <View style={[styles.avatar, { backgroundColor: conversation.color }]}>
            <Text style={styles.avatarText}>{conversation.initials}</Text>
          </View>
          <View style={styles.conversationCopy}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{conversation.name}</Text>
              <View style={styles.streakPill}>
                <Flame color="#F97316" fill="#F97316" size={13} />
                <Text style={styles.streakPillText}>{conversation.streak}</Text>
              </View>
            </View>
            <Text style={styles.preview}>{conversation.preview}</Text>
          </View>
          <ChevronRight color="#A3A3A3" size={20} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Pressable style={styles.quickAction}>
      <View style={styles.quickIcon}>{icon}</View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  content: {
    paddingBottom: 28,
    paddingHorizontal: 18,
    paddingTop: 58,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: '#737373',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  title: {
    color: '#171717',
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#171717',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  streakCard: {
    alignItems: 'center',
    backgroundColor: '#FFFC00',
    borderRadius: 18,
    flexDirection: 'row',
    marginTop: 24,
    padding: 16,
  },
  streakIcon: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  streakCopy: {
    flex: 1,
    marginLeft: 13,
  },
  streakTitle: {
    color: '#171717',
    fontSize: 17,
    fontWeight: '800',
  },
  streakSubtitle: {
    color: '#525252',
    fontSize: 12,
    marginTop: 3,
  },
  streakCount: {
    color: '#171717',
    fontSize: 28,
    fontWeight: '800',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  quickAction: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 14,
  },
  quickIcon: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  quickLabel: {
    color: '#262626',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 7,
  },
  sectionTitle: {
    color: '#171717',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 28,
  },
  conversation: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 13,
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 28,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  conversationCopy: {
    flex: 1,
    marginLeft: 13,
  },
  nameRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    color: '#171717',
    fontSize: 16,
    fontWeight: '800',
  },
  streakPill: {
    alignItems: 'center',
    backgroundColor: '#FFF1E8',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  streakPillText: {
    color: '#C2410C',
    fontSize: 11,
    fontWeight: '800',
  },
  preview: {
    color: '#737373',
    fontSize: 13,
    marginTop: 4,
  },
});