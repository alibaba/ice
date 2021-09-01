import { useMethod } from '../hook/useMethod';

export interface Repo {
  id: number;
  name: string;
  description: string;
}

const repos: Repo[] = [
  {
    id: 1,
    name: 'facebook/react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces',
  },
  {
    id: 2,
    name: 'vuejs/vue',
    description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web. ',
  },
  {
    id: 3,
    name: 'angular/angular',
    description: 'One framework. Mobile & desktop. ',
  },
  {
    id: 4,
    name: 'nuxt/nuxt.js',
    description: 'The Vue.js Framework',
  },
  {
    id: 5,
    name: 'zeit/next.js',
    description: 'The React Framework',
  },
  {
    id: 6,
    name: 'alibaba/ice',
    description: 'A universal framework based on React.js.',
  },
];

export async function getRepo() {
  return {
    method: useMethod(),
    dataSource: repos,
  };
}

export async function addRepo(repo: Repo) {
  repo.id = repos.length + 1;
  repos.push(repo);

  return {
    method: useMethod(),
  };
}

export async function deleteRepo(id: number) {
  const index = repos.findIndex((repo) => repo.id === id);
  if (index !== -1) {
    repos.splice(index, 1);
  }

  return {
    method: useMethod(),
  };
}

export async function editRepo(newRepo: Repo) {
  const index = repos.findIndex((repo) => repo.id === newRepo.id);
  if (index !== -1) {
    repos[index] = newRepo;
  }

  return {
    method: useMethod(),
  };
}
