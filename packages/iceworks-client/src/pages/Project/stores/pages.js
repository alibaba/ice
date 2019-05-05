import appConfig from '@src/appConfig';

export default {
  dataSource: [],
  async refresh(projectFolderPath) {
    const response = await fetch(`${appConfig.apiUrl}page?projectFolderPath=${projectFolderPath}`);
    if (response.status === 200) {
      const data = await response.json();
      this.dataSource = data.data;
    }
  },
};
