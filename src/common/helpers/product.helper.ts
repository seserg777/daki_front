import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ProductModel } from '../models/product.model';
import { AttributevalueModel } from '../models/attributevalue.model';
import { MediaModel } from '../models/media.model';

export class ProductHelper {
  public static createProductModelFromServerData(data: KeyValueInterface<any>): ProductModel {
    return new ProductModel({
        product_id: data.product_id,
        title: data.title,
        short_description: data.short_description,
        description: data.description,
        price: data.price,
        price_calculated: data.price_calculated,
        media: data.media,
        manufacturer_id: data.manufacturer_id,
        manufacturer_code: data.manufacturer_code,
        manufacturer_title: data.manufacturer_title,
        product_ean: data.product_ean,
        category_id: data.category_id,
        category_title: data.category_title,
        product_quantity: data.product_quantity,
        state: data.state,
        slug: data.slug,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_keyword: data.meta_keyword,
        wishlist: data.wishlist,
        child: data.child,
        attributes: data.attributes,
        attributesSorted: []
    });
  }

  public static createProductModel(data: KeyValueInterface<any> = {}): ProductModel {
    return new ProductModel({
      product_id: data.product_id,
      title: data.title,
      short_description: data.short_description,
      description: data.description,
      price: data.price,
      price_calculated: data.price_calculated,
      media: (
        !!data.media
        ? data.media.map((item: KeyValueInterface<any>): MediaModel => {
            return new MediaModel({
              id: item.id,
              type: item.type,
              item_id: item.item_id,
              full_image: item.full_image,
              thumb_image: item.thumb_image,
              webp_full_image: item.webp_full_image,
              webp_thumb_image: item.webp_thumb_image,
              ordering: item.ordering
            });
          })
        : []
      ),
      manufacturer_id: data.manufacturer_id,
      manufacturer_code: data.manufacturer_code,
      manufacturer_title: data.manufacturer_title,
      product_ean: data.product_ean,
      category_id: data.category_id,
      category_title: data.category_title,
      product_quantity: data.product_quantity,
      state: data.state,
      slug: data.slug,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      meta_keyword: data.meta_keyword,
      wishlist: data.wishlist,
      child: (
        !!data.child
        ? data.child.map((item: KeyValueInterface<any>): ProductModel => {
            return new ProductModel({
              product_id: item.product_id,
              title: item.title,
              short_description: item.short_description,
              description: item.description,
              price: item.price,
              price_calculated: item.price_calculated,
              media: (
                !!item.media
                ? item.media.map((i: KeyValueInterface<any>): MediaModel => {
                    return new MediaModel({
                      id: i.id,
                      type: i.type,
                      item_id: i.item_id,
                      full_image: i.full_image,
                      thumb_image: i.thumb_image,
                      webp_full_image: i.webp_full_image,
                      webp_thumb_image: i.webp_thumb_image,
                      ordering: i.ordering
                    });
                  })
                : []
              ),
              manufacturer_id: item.manufacturer_id,
              manufacturer_code: item.manufacturer_code,
              manufacturer_title: item.manufacturer_title,
              product_ean: item.product_ean,
              category_id: item.category_id,
              category_title: item.category_title,
              product_quantity: item.product_quantity,
              state: item.state,
              slug: item.slug,
              meta_title: item.meta_title,
              meta_description: item.meta_description,
              meta_keyword: item.meta_keyword,
              wishlist: item.wishlist,
              child: [],
              attributes: [],
              attributesSorted: (
                !!item.attributes
                ? ProductHelper.createAttributesSorted(item.attributes)
                : []
              )
            });
          })
        : []
      ),
      attributes: (
        !!data.attributes
        ? data.attributes.map((item: KeyValueInterface<any>): AttributevalueModel => {
            return new AttributevalueModel({
              attr_value_id: item.attr_value_id,
              attr_id: item.attr_id,
              product_id: item.product_id,
              price_modification: item.price_modification,
              price: item.price,
              image: item.image,
              value: item.value,
              title: item.title,
              color: item.color,
              ordering: item.ordering,
              child_product_id: item.child_product_id
            });
          })
        : []
      ),
      attributesSorted: (
        !!data.attributes
        ? ProductHelper.createAttributesSorted(data.attributes)
        : []
      )
    });
  }

  public static createAttributesSorted(attributes: KeyValueInterface<any>): AttributevalueModel[][] {
    const attributesSorted: AttributevalueModel[][] = [];
    for (const i of Object.keys(attributes)) {
      if (!attributesSorted[attributes[i]['attr_id']]) {
          attributesSorted[attributes[i]['attr_id']] = [];
      }

      const attr = new AttributevalueModel({
        attr_value_id: attributes[i]['attr_value_id'],
        attr_id: attributes[i]['attr_id'],
        product_id: attributes[i]['product_id'],
        price_modification: attributes[i]['price_modification'],
        price: attributes[i]['price'],
        image: attributes[i]['image'],
        value: attributes[i]['value'],
        title: attributes[i]['title'],
        color: attributes[i]['color'],
        ordering: attributes[i]['title'],
        child_product_id: attributes[i]['child_product_id']
      });

      attributesSorted[attributes[i]['attr_id']].push(attr);
    }
    return attributesSorted;
  }

  public static createProductModelArray(data: any[]): ProductModel[] {
    return data.map((item: KeyValueInterface<any>): ProductModel => ProductHelper.createProductModel(item));
  }

  public static cloneProductModel(model: ProductModel): ProductModel {
    return new ProductModel({
      product_id: model.product_id,
        title: model.title,
        short_description: model.short_description,
        description: model.description,
        price: model.price,
        price_calculated: model.price_calculated,
        media: model.media,
        manufacturer_id: model.manufacturer_id,
        manufacturer_code: model.manufacturer_code,
        manufacturer_title: model.manufacturer_title,
        product_ean: model.product_ean,
        category_id: model.category_id,
        category_title: model.category_title,
        product_quantity: model.product_quantity,
        state: model.state,
        slug: model.slug,
        meta_title: model.meta_title,
        meta_description: model.meta_description,
        meta_keyword: model.meta_keyword,
        wishlist: model.wishlist,
        child: model.child,
        attributes: model.attributes,
        attributesSorted: model.attributesSorted
    });
  }
}
