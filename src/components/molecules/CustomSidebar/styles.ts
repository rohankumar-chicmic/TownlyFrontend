import { StyleSheet } from "react-native";
import { ThemeColors } from "@theme/constants";

const styles = (Colors: ThemeColors) => StyleSheet.create({
  profileSection: {
    paddingVertical: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    padding: 20,
    fontWeight: '600',
    backgroundColor: Colors.elevated,
    borderRadius: 10,
  },
  email: {
    fontSize: 13,
    marginTop: 2,
    opacity: 0.7,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 2,
  },
  icon: {
    fontSize: 18,
    width: 28,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  logoutText: {
    color: '#ff4d4d',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 4,
  },
});

export default styles