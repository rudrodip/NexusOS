type Bucket = {
  doc_count: number;
  key: string;
}

type SubtypeBucket = {
  doc_count: number;
  key: string;
}

type Aggregations = {
  access_right: {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  file_type: {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  keywords: {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  type: {
    buckets: {
      doc_count: number;
      key: string;
      subtype: {
        buckets: SubtypeBucket[];
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
      };
    }[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
}

type Links = {
  badge: string;
  bucket: string;
  conceptbadge: string;
  conceptdoi: string;
  doi: string;
  html: string;
  latest: string;
  latest_html: string;
  self: string;
}

type File = {
  bucket: string;
  checksum: string;
  key: string;
  links: {
    self: string;
  };
  size: number;
  type: string;
}

type Metadata = {
  access_right: string;
  access_right_category: string;
  communities?: {
    id: string;
  }[];
  creators: {
    affiliation?: string;
    name: string;
    orcid?: string;
  }[];
  description: string;
  doi: string;
  journal?: {
    issue: string;
    pages: string;
    title: string;
    volume: string;
  }
  keywords: string[];
  license: {
    id: string;
  };
  publication_date: string;
  related_identifiers: {
    identifier: string;
    relation: string;
    scheme: string;
  }[];
  relations: {
    version: {
      count: number;
      index: number;
      is_last: boolean;
      last_child: {
        pid_type: string;
        pid_value: string;
      };
      parent: {
        pid_type: string;
        pid_value: string;
      };
    }[];
  };
  resource_type: {
    subtype: string;
    title: string;
    type: string;
  };
  title: string;
}

type Hit = {
  conceptdoi: string;
  conceptrecid: string;
  created: string;
  doi: string;
  files: File[];
  id: number;
  links: Links;
  metadata: Metadata;
  owners: number[];
  revision: number;
  stats: {
    downloads: number;
    unique_downloads: number;
    unique_views: number;
    version_downloads: number;
    version_unique_downloads: number;
    version_unique_views: number;
    version_views: number;
    version_volume: number;
    views: number;
    volume: number;
  };
  updated: string;
}

type Hits = {
  hits: Hit[];
  total: number;
}

type ZenodoData = {
  aggregations?: Aggregations;
  hits: Hits;
  links?: {
    next: string;
    self: string;
  };
}
/**
 * Represents the query parameters for the Zenodo API request.
 *
 * @param {string} q - Search query using Elasticsearch query string syntax.
 * @param {string} status - Filter result based on the deposit status (either draft or published).
 * @param {string} sort - Sort order (bestmatch or mostrecent). Prefix with minus to change from ascending to descending (e.g., -mostrecent).
 * @param {number} page - Page number for pagination.
 * @param {number} size - Number of results to return per page.
 * @param {number | string} all_versions - Show (true or 1) or hide (false or 0) all versions of records.
 * @param {string} communities - Return records that are part of the specified communities. (Use community identifier)
 * @param {string} type - Return records of the specified type. (Publication, Poster, Presentation, etc.)
 * @param {string} subtype - Return records of the specified subtype. (Journal article, Preprint, Proposal, etc.)
 * @param {string} bounds - Return records filtered by a geolocation bounding box. (Format: bounds=143.37158,-38.99357,146.90918,-37.35269)
 * @param {string} custom - Return records containing the specified custom keywords. (Format: custom=[field_name]:field_value)
 */
type ZenodoQueryParams = {
  q?: string;
  status?: 'draft' | 'published';
  sort?: 'bestmatch' | 'mostrecent';
  page?: number;
  size?: number;
  all_versions?: number | string;
  communities?: string;
  type?: string;
  subtype?: string;
  bounds?: string;
  custom?: string;
};

export type {ZenodoQueryParams, ZenodoData, Hit}