import { Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react-native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const posts = [
  {
    id: '1',
    user: 'maya.travels',
    location: 'Goa, India',
    initials: 'MT',
    color: '#E1306C',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85',
    caption: 'Golden hour and nowhere else to be.',
    likes: '2,481',
  },
  {
    id: '2',
    user: 'arjun.frames',
    location: 'Jaipur, India',
    initials: 'AF',
    color: '#7C3AED',
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85',
    caption: 'A little color for the middle of the week.',
    likes: '1,906',
  },
];

export default function FeedScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.brand}>snapsgram</Text>
        <View style={styles.headerActions}>
          <Pressable accessibilityLabel="Activity">
            <Heart color="#171717" size={24} />
          </Pressable>
          <Pressable accessibilityLabel="Messages">
            <Send color="#171717" size={23} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stories}
      >
        <Story label="Your story" initials="You" color="#171717" />
        <Story label="maya.travels" initials="MT" color="#E1306C" />
        <Story label="arjun.frames" initials="AF" color="#7C3AED" />
        <Story label="nisha.codes" initials="NC" color="#F59E0B" />
        <Story label="dev.desk" initials="DD" color="#0EA5E9" />
      </ScrollView>

      {posts.map((post) => (
        <View key={post.id} style={styles.post}>
          <View style={styles.postHeader}>
            <View style={styles.userRow}>
              <Avatar initials={post.initials} color={post.color} small />
              <View>
                <Text style={styles.username}>{post.user}</Text>
                <Text style={styles.location}>{post.location}</Text>
              </View>
            </View>
            <MoreHorizontal color="#171717" size={22} />
          </View>

          <Image source={{ uri: post.image }} style={styles.postImage} />

          <View style={styles.postActions}>
            <View style={styles.actionGroup}>
              <Heart color="#171717" size={24} />
              <MessageCircle color="#171717" size={24} />
              <Send color="#171717" size={23} />
            </View>
            <Text style={styles.saveIcon}>○</Text>
          </View>

          <Text style={styles.likes}>{post.likes} likes</Text>
          <Text style={styles.caption}>
            <Text style={styles.username}>{post.user} </Text>
            {post.caption}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

function Avatar({
  initials,
  color,
  small = false,
}: {
  initials: string;
  color: string;
  small?: boolean;
}) {
  return (
    <View
      style={[
        styles.avatar,
        small && styles.smallAvatar,
        { backgroundColor: color },
      ]}
    >
      <Text style={[styles.avatarText, small && styles.smallAvatarText]}>
        {initials}
      </Text>
    </View>
  );
}

function Story({ label, initials, color }: { label: string; initials: string; color: string }) {
  return (
    <View style={styles.story}>
      <Avatar initials={initials} color={color} />
      <Text style={styles.storyLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 28,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#ededed',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 58,
    paddingBottom: 14,
  },
  brand: {
    color: '#171717',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -1,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
  },
  stories: {
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  story: {
    alignItems: 'center',
    width: 72,
  },
  avatar: {
    alignItems: 'center',
    borderColor: '#E1306C',
    borderRadius: 38,
    borderWidth: 2,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  smallAvatar: {
    borderWidth: 0,
    height: 38,
    width: 38,
  },
  avatarText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  smallAvatarText: {
    fontSize: 11,
  },
  storyLabel: {
    color: '#525252',
    fontSize: 11,
    marginTop: 6,
  },
  post: {
    borderTopColor: '#ededed',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 22,
  },
  postHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  username: {
    color: '#171717',
    fontWeight: '700',
  },
  location: {
    color: '#737373',
    fontSize: 12,
    marginTop: 2,
  },
  postImage: {
    backgroundColor: '#e5e5e5',
    height: 390,
    width: '100%',
  },
  postActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  actionGroup: {
    flexDirection: 'row',
    gap: 17,
  },
  saveIcon: {
    color: '#171717',
    fontSize: 28,
    lineHeight: 20,
    transform: [{ rotate: '45deg' }],
  },
  likes: {
    color: '#171717',
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 10,
  },
  caption: {
    color: '#262626',
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 16,
    marginTop: 5,
  },
});