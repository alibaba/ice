console.log('ICE ServiceWorker Startup');
const DB = {};
let DBValid = false;

self.addEventListener('install', function (event) {
  console.log('ICE ServiceWorker installed');
  // 可以在 install 之前阻塞住并执行
  event.waitUntil(Promise.resolve(true));
});

self.addEventListener('message', event => {
  DBValid = true;
  Object.assign(DB, event.data);
});

self.addEventListener('fetch', function (event) {
  if (/service/.test(event.request.url) && DBValid) {
    event.respondWith(hijectSerivce(event.request, DB));
  }
});

function hijectSerivce(request, database) {
  const url = new URL(request.url);

  const body = {
    status: 'SUCCESS',
    data: null,
  };

  switch (url.pathname) {
    case '/service/template/categories':
      Object.assign(body, handleListCategories(database));
      break;

    case '/service/template/blocks':
      const category = url.searchParams.get('category');
      Object.assign(body, handleListBlocks(category, database));
      break;

    // list docs
    case '/service/documentation':
      Object.assign(body, handleListDocs(database));
      break;

    default:
      // hanlde dymanic url
      const matchBlockQuery = /service\/template\/block\/(\d+)/.exec(url.pathname);
      if (matchBlockQuery) {
        Object.assign(body, handleQueryBlock(matchBlockQuery[1], database));
        break;
      }

      const matchDocQuery = /service\/documentation\/(\d+)/.exec(url.pathname);
      if (matchDocQuery) {
        Object.assign(body, handleQueryDoc(matchDocQuery[1], database));
        break;
      }
  }


  return new Response(
    JSON.stringify(body),
    {
      headers: {
        'Content-type': 'application/json'
      }
    }
  );
}


// controller list categories
function handleListCategories(db) {
  const data = {
    list: [...db.template.categories],
    total: db.template.categories.length,
  };
  return { data };
}

// controller list blocks
function handleListBlocks(category, db) {
  const data = {
    list: db.template.blocks,
    page: 0,
    offset: 0,
    pageSize: 1000,
    limit: 20,
  };
  if (!category) {
    return { data };
  } else {
    data.list = data.list.filter(item => {
      return item.categories && item.categories.some((cat) => {
        return cat.name === category;
      });
    });
    return { data };
  }
}

function handleQueryBlock(blockId, db) {
  for (let i = 0; i < db.template.blocks.length; i++) {
    const block = db.template.blocks[i];
    if (block.id == blockId) {
      return { data: { ...block } };
    }
  }
  return { status: 'ERROR', message: '未查询到数据' };
}

function handleListDocs(db) {
  const catalogue = db.docs.catalogue;
  return { data: [...catalogue] };
}

function handleQueryDoc(docId, db) {
  for (let i = 0; i < db.docs.documentations.length; i++) {
    const doc = db.docs.documentations[i];
    if (doc.id == docId) {
      return { data: { ...doc } };
    }
  }
  return { status: 'ERROR', message: '未查询到数据' };
}
