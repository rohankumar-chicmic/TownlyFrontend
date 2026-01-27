import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 14,
  },

  stepWrapper: {
    alignItems: 'center',
    width: 80,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#333',
  },

  activeDot: {
    backgroundColor: '#C6FF00',
    shadowColor: '#C6FF00',
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },

  completedDot: {
    backgroundColor: '#4CAF50',
  },

  line: {
    height: 2,
    flex: 1,
    backgroundColor: '#333',
    marginHorizontal: 8,
  },

  completedLine: {
    backgroundColor: '#4CAF50',
  },

  stepLabel: {
    color: '#777',
    fontSize: 12,
    marginTop: 6,
  },

  activeLabel: {
    color: '#C6FF00',
    fontWeight: '600',
  },

  subLabel: {
    color: '#666',
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default styles
