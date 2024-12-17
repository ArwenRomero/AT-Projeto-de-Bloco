import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#e91e63',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },
  featuredImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
  },
  featuredTitle: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  categoryButton: {
    backgroundColor: '#e91e63',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});
